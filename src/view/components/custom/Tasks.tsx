import { AnyAction } from '@reduxjs/toolkit'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TimeEntryApi from '../../../core/api/TimeEntryApi'
import { ProjectView } from '../../../core/types/Project'
import { TimeEntryView } from '../../../core/types/TimeEntry'
import { lastTimeEntriesAsyncActions } from '../../../store/features/clockify/last-time-entries/asyncActions'
import { lastTimeEntriesSelectors } from '../../../store/features/clockify/last-time-entries/selectors'
import { projectsClockifySelectors } from '../../../store/features/clockify/projects/selectors'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'
import { projectTag, TaskCard } from './TaskCard'

export const Tasks: FC = () => {
    const dispatch = useDispatch()
    const lastTimeEntries = useSelector(lastTimeEntriesSelectors.getLastTimeEntries)
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)
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
            lastTimeEntries !== undefined &&
            lastTimeEntries.length > 0 &&
            projects !== undefined &&
            projects.length > 0
        ) {
            createQuickActionTask(lastTimeEntries, mapToTags, projects)
        }
    }, [lastTimeEntries, projects])

    const mapToTags = (project?: ProjectView): projectTag[] => {
        if (!project) return []

        const tagsDescription = project.name.split(' - ')
        return tagsDescription.map((tag) => ({
            text: tag,
            color: project.color,
        }))
    }

    const createQuickActionTask = (
        lastTimeEntries: TimeEntryView[],
        mapToTags: (project?: ProjectView) => projectTag[],
        projects: ProjectView[],
    ) => {
        const newQuickActionTasks: QuickActionTask[] = lastTimeEntries.map(
            (lastTimeEntry) => ({
                tags: mapToTags(
                    projects.find((project) => project.id === lastTimeEntry.projectId),
                ),
                taskId: lastTimeEntry.taskId,
                projectId: lastTimeEntry.projectId,
                description: getTaskDescription(
                    lastTimeEntry,
                    projects.find((project) => project.id === lastTimeEntry.projectId),
                ),
            }),
        )

        const newQuickActionTasksUnique = newQuickActionTasks.filter(
            (value, index, self) => {
                return self.findIndex((v) => v.taskId === value.taskId) === index
            },
        )

        setQuickActionTask(newQuickActionTasksUnique)
    }

    const getTaskDescription = (
        lastTimeEntry: TimeEntryView,
        project?: ProjectView,
    ): string | undefined => {
        if (!project) {
            console.error('Project do not exist for time entry')
            return undefined
        }
        return project.tasks.find((task) => task.id === lastTimeEntry.taskId)?.name
    }

    const [quickActionTask, setQuickActionTask] = useState<QuickActionTask[]>([])
    const handleStartClick = async (projectId: string, taskId: string) => {
        if (!workspaceId) return console.error('missing workspaceId')
        await TimeEntryApi.startTracking(workspaceId, projectId, taskId)
    }
    const handlePauseClick = async () => {
        if (!workspaceId) return console.error('missing workspaceId')
        if (!userId) return console.error('missing userId')
        await TimeEntryApi.stopTracking(workspaceId, userId)
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
                    onPauseClick={handlePauseClick}
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
