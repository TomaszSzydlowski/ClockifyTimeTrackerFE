import { AnyAction } from '@reduxjs/toolkit'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TimeEntryApi from '../../../core/api/TimeEntryApi'
import { ProjectView } from '../../../core/types/Project'
import { lastTimeEntriesAsyncActions } from '../../../store/features/clockify/last-time-entries/asyncActions'
import { lastTimeEntriesSelectors } from '../../../store/features/clockify/last-time-entries/selectors'
import { projectsClockifySelectors } from '../../../store/features/clockify/projects/selectors'
import { tasksAsyncActions } from '../../../store/features/clockify/tasks/asyncActions'
import { tasksClockifySelectors } from '../../../store/features/clockify/tasks/selectors'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'
import { projectTag, TaskCard } from './TaskCard'

export const Tasks: FC = () => {
    const dispatch = useDispatch()
    const lastTimeEntries = useSelector(lastTimeEntriesSelectors.getLastTimeEntries)
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)
    const tasks = useSelector(tasksClockifySelectors.getTasks)
    const projects = useSelector(projectsClockifySelectors.getprojects)

    useEffect(() => {
        if (userId !== undefined && workspaceId !== undefined) {
            dispatch(
                lastTimeEntriesAsyncActions.getClockifyLastTimeEntries({
                    userId,
                    workspaceId,
                }) as unknown as AnyAction,
            )
        }
    }, [userId, workspaceId])

    useEffect(() => {
        if (
            workspaceId !== undefined &&
            lastTimeEntries !== undefined &&
            lastTimeEntries.length > 0
        ) {
            const uniqueProjectsIds = lastTimeEntries
                .map((l) => l.projectId)
                .filter((v, i, a) => a.indexOf(v) === i)
            dispatch(
                tasksAsyncActions.getClockifyTasksForProjectsIds({
                    workspaceId,
                    projectsIds: uniqueProjectsIds,
                }) as unknown as AnyAction,
            )
        }
    }, [lastTimeEntries])

    const mapToTags = (project?: ProjectView): projectTag[] => {
        if (!project) return []

        const tagsDescription = project.name.split(' - ')
        return tagsDescription.map((tag) => ({
            text: tag,
            color: project.color,
        }))
    }

    useEffect(() => {
        if (
            lastTimeEntries !== undefined &&
            lastTimeEntries.length > 0 &&
            tasks !== undefined &&
            tasks.length > 0 &&
            projects !== undefined &&
            projects.length > 0
        ) {
            const newQuickActionTasks: QuickActionTask[] = lastTimeEntries.map(
                (lastTimeEntry) => ({
                    tags: mapToTags(
                        projects.find(
                            (project) => project.id === lastTimeEntry.projectId,
                        ),
                    ),
                    taskId: lastTimeEntry.taskId,
                    projectId: lastTimeEntry.projectId,
                    description: tasks.find((task) => task.id === lastTimeEntry.taskId)
                        ?.name,
                }),
            )

            const newQuickActionTasksUnique = newQuickActionTasks.filter(
                (value, index, self) => {
                    return self.findIndex((v) => v.taskId === value.taskId) === index
                },
            )

            setQuickActionTask(newQuickActionTasksUnique)
        }
    }, [lastTimeEntries, tasks, projects])

    const [quickActionTask, setQuickActionTask] = useState<QuickActionTask[]>([])
    const handleStartClick = async (projectId: string, taskId: string) => {
        console.log(`start: ${projectId}, ${workspaceId}`)
        if (!workspaceId) return console.error('missing workspaceId')
        await TimeEntryApi.startTracking(workspaceId, projectId, taskId)
    }
    const handlePauseClick = (projectId: string, workspaceId: string) => {
        return console.log(`pause: ${projectId}, ${workspaceId}`)
    }
    return (
        <div className="tasks_list">
            {quickActionTask.map((quickActionTask, index) => (
                <TaskCard
                    key={index}
                    description={quickActionTask.description}
                    projectTags={quickActionTask.tags}
                    onStartClick={() =>
                        handleStartClick(
                            quickActionTask.projectId,
                            quickActionTask.taskId,
                        )
                    }
                    onPauseClick={() =>
                        handlePauseClick(
                            quickActionTask.projectId,
                            quickActionTask.taskId,
                        )
                    }
                />
            ))}
        </div>
    )
}

interface QuickActionTask {
    description?: string
    tags: projectTag[]
    taskId: string
    projectId: string
}
