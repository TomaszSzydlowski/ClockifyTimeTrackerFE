import { LeftOutlined } from '@ant-design/icons'
import { AnyAction } from '@reduxjs/toolkit'
import { Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ProjectView, TaskView } from '../../core/types/Project'
import { QuickActionTask } from '../../core/types/QuickActionTask'
import { projectsClockifySelectors } from '../../store/features/clockify/projects/selectors'
import { trackingAsyncActions } from '../../store/features/clockify/tracking/asyncActions'
import { trackingClockifySelectors } from '../../store/features/clockify/tracking/selectors'
import { userClockifySelectors } from '../../store/features/clockify/user/selectors'
import { TaskCard } from '../components/custom/TaskCard'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const ProjectPage: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const projects = useSelector(projectsClockifySelectors.getProjects)
    const queryParam = useParams<{ projectNumber: string }>()

    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)
    const tracking = useSelector(trackingClockifySelectors.getTracking)

    const [selectedProject, setSelectedProject] = useState<undefined | ProjectView>(
        undefined,
    )

    const [quickActionTasks, setQuickActionTasks] = useState<QuickActionTask[]>([])

    useEffect(() => {
        if (!projects || projects.length === 0 || !queryParam.projectNumber) return

        const project = projects.find(
            (project) => project.id === queryParam.projectNumber,
        )
        if (!project) return
        const quickActionTasks: QuickActionTask[] = project.tasks.map((task) => ({
            taskId: task.id,
            projectId: project.id,
            description: task.name,
            isTracking: checkIfIsTracking(project, task),
        }))
        setSelectedProject(project)
        setQuickActionTasks(quickActionTasks)
        return () => {
            setSelectedProject(undefined)
            setQuickActionTasks([])
        }
    }, [projects, queryParam, tracking])

    const checkIfIsTracking = (project?: ProjectView, task?: TaskView) => {
        if (tracking === undefined) return false
        if (tracking.timeInterval.end) return false
        if (task === undefined) {
            if (
                project !== undefined &&
                tracking.projectId === project.id &&
                tracking.taskId === null
            )
                return true
        } else {
            if (task.id === tracking.taskId) return true
        }

        return false
    }

    const handleStartClick = async (projectId: string, taskId?: string) => {
        if (!workspaceId) return console.error('missing workspaceId')
        if (!userId) return console.error('missing userId')
        dispatch(
            trackingAsyncActions.startTracking({
                workspaceId,
                projectId,
                taskId,
            }) as unknown as AnyAction,
        )
    }
    const handlePauseClick = async () => {
        if (!workspaceId) return console.error('missing workspaceId')
        if (!userId) return console.error('missing userId')
        dispatch(
            trackingAsyncActions.stopTracking({
                workspaceId,
                userId,
            }) as unknown as AnyAction,
        )
    }

    return (
        <BaseLayout>
            <>
                <div className="project_page">
                    <div className="project_page__header">
                        <Button
                            style={{ padding: 0 }}
                            type="text"
                            onClick={() => navigate('/home')}
                        >
                            <LeftOutlined />
                        </Button>
                        <h3
                            className="project_page__name"
                            style={{ color: selectedProject?.color }}
                        >
                            {selectedProject?.name}
                        </h3>
                    </div>
                </div>
                {quickActionTasks?.map((quickActionTask, index) => (
                    <TaskCard
                        key={index}
                        description={quickActionTask.description}
                        onStartClick={() =>
                            handleStartClick(
                                quickActionTask.projectId,
                                quickActionTask.taskId,
                            )
                        }
                        onPauseClick={handlePauseClick}
                        isTracking={quickActionTask.isTracking}
                    />
                ))}
            </>
        </BaseLayout>
    )
}
