import { CameraOutlined } from '@ant-design/icons'
import { AnyAction } from '@reduxjs/toolkit'
import { Collapse } from 'antd'
import { Input } from 'antd'
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    FormEvent,
    useEffect,
    useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProjectView, TaskView } from '../../core/types/Project'
import { QuickActionTask } from '../../core/types/QuickActionTask'
import { projectsAsyncActions } from '../../store/features/clockify/projects/asyncActions'
import { projectsClockifySelectors } from '../../store/features/clockify/projects/selectors'
import { trackingAsyncActions } from '../../store/features/clockify/tracking/asyncActions'
import { trackingClockifySelectors } from '../../store/features/clockify/tracking/selectors'
import { userClockifySelectors } from '../../store/features/clockify/user/selectors'
import { yoursProjectsSelectors } from '../../store/features/clockify/yours-projects/selectors'
import { TaskCard } from '../components/custom/TaskCard'
import { BaseLayout } from '../components/layouts/BaseLayout'

const { Panel } = Collapse
const { Search } = Input

interface ProjectQuickActionTasks {
    name: string
    color: string
    quickActionTasks: QuickActionTask[]
}

export const SearchPage: FC = () => {
    const dispatch = useDispatch()

    const projects = useSelector(projectsClockifySelectors.getProjects)
    const yoursProjects = useSelector(yoursProjectsSelectors.getYoursProjects)
    const [yoursProjectsView, setYoursProjectsView] = useState<ProjectView[]>([])
    const [projectQuickActionTasks, setProjectQuickActionTasks] = useState<
        ProjectQuickActionTasks[]
    >([])
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)
    const tracking = useSelector(trackingClockifySelectors.getTracking)
    const [activityKey, setActivityKey] = useState<string | string[]>([])

    const setDefaultProjects = () => {
        if (
            !projects ||
            projects.length === 0 ||
            !yoursProjects ||
            yoursProjects.length === 0
        )
            return
        const newYoursProjectsView = projects.filter((project) =>
            yoursProjects.includes(project.id),
        )
        setYoursProjectsView(newYoursProjectsView)
    }

    useEffect(() => {
        if (!userId || !workspaceId) return
        dispatch(
            projectsAsyncActions.getClockifyProjects(workspaceId) as unknown as AnyAction,
        )
    }, [userId, workspaceId])

    useEffect(() => {
        setDefaultProjects()
    }, [projects, yoursProjects])

    useEffect(() => {
        if (!yoursProjectsView || yoursProjectsView.length === 0) return

        const projectQuickActionTasks: ProjectQuickActionTasks[] = yoursProjectsView.map(
            (project) => ({
                name: project.name,
                color: project.color,
                quickActionTasks: project.tasks.map((task) => ({
                    taskId: task.id,
                    projectId: project.id,
                    description: task.name,
                    isTracking: checkIfIsTracking(project, task),
                })),
            }),
        )

        setProjectQuickActionTasks(projectQuickActionTasks)
        return () => {
            setProjectQuickActionTasks([])
        }
    }, [yoursProjectsView, tracking])

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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const projectQuickActionTasks: ProjectQuickActionTasks[] = yoursProjectsView.map(
            (project) => {
                const newTasks = project.tasks.filter((task) =>
                    task.name.toLowerCase().includes(value.toLowerCase()),
                )
                return {
                    name: project.name,
                    color: project.color,
                    quickActionTasks: newTasks.map((task) => ({
                        taskId: task.id,
                        projectId: project.id,
                        description: task.name,
                        isTracking: checkIfIsTracking(project, task),
                    })),
                }
            },
        )
        const removeEmptyProject = projectQuickActionTasks.filter(
            (project) => project.quickActionTasks.length > 0,
        )
        setProjectQuickActionTasks(removeEmptyProject)
        if (value === '') {
            setActivityKey([])
            return
        }
        const activeKeyOpenWhenFound = removeEmptyProject.map((_, index) =>
            index.toString(),
        )
        setActivityKey(activeKeyOpenWhenFound)
    }
    return (
        <BaseLayout>
            <div className="search_page">
                <div className="search_page_header">
                    <div className="search_page_header__title">Search</div>
                    <div className="search_page_header__icon">
                        <CameraOutlined />
                    </div>
                </div>
                <div className="search_page__input">
                    <Search
                        placeholder="What task are you looking for?"
                        allowClear
                        onChange={onChange}
                    />
                </div>
                <div className="search_page_collapse">
                    <Collapse
                        bordered={false}
                        activeKey={activityKey}
                        onChange={(key) => setActivityKey(key)}
                    >
                        {projectQuickActionTasks.map((project, index) => (
                            <Panel
                                key={index}
                                header={project.name}
                                style={{ color: project.color }}
                            >
                                {project.quickActionTasks.map(
                                    (quickActionTask, index) => (
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
                                    ),
                                )}
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        </BaseLayout>
    )
}
