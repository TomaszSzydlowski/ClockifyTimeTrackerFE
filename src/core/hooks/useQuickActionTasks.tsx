import { AnyAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { lastTimeEntriesAsyncActions } from '../../store/features/clockify/last-time-entries/asyncActions'
import { lastTimeEntriesSelectors } from '../../store/features/clockify/last-time-entries/selectors'
import { projectsClockifySelectors } from '../../store/features/clockify/projects/selectors'
import { trackingClockifySelectors } from '../../store/features/clockify/tracking/selectors'
import { userClockifySelectors } from '../../store/features/clockify/user/selectors'
import { projectTag } from '../../view/components/custom/TaskCard'
import { ProjectView, TaskView } from '../types/Project'
import { TimeEntryView } from '../types/TimeEntry'

interface QuickActionTask {
    description?: string
    tags: projectTag[]
    taskId: string
    projectId: string
    isTracking: boolean
}

export const useQuickActionTasks = (): QuickActionTask[] => {
    const dispatch = useDispatch()

    const lastTimeEntries = useSelector(lastTimeEntriesSelectors.getLastTimeEntries)
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)
    const projects = useSelector(projectsClockifySelectors.getprojects)
    const tracking = useSelector(trackingClockifySelectors.getTracking)

    const [quickActionTask, setQuickActionTask] = useState<QuickActionTask[]>([])

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
            createQuickActionTask(lastTimeEntries, projects)
        }
    }, [lastTimeEntries, projects, tracking])

    const mapToTags = (project?: ProjectView): projectTag[] => {
        if (!project) return []

        const regex = /\B- #\w+/
        const tagsDescription = project.name.replace(regex, '').split(' - ')
        return tagsDescription.map((tag) => ({
            text: tag,
            color: project.color,
        }))
    }

    function checkIfIsTracking(project?: ProjectView, task?: TaskView) {
        if (tracking === undefined) return false

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

    const createQuickActionTask = (
        lastTimeEntries: TimeEntryView[],
        projects: ProjectView[],
    ) => {
        const newQuickActionTasks: QuickActionTask[] = lastTimeEntries.map(
            (lastTimeEntry) => {
                const project = projects.find(
                    (project) => project.id === lastTimeEntry.projectId,
                )
                const task = project?.tasks.find(
                    (task) => task.id === lastTimeEntry.taskId,
                )
                return {
                    tags: mapToTags(project),
                    taskId: lastTimeEntry.taskId,
                    projectId: lastTimeEntry.projectId,
                    description: getTaskDescription(task),
                    isTracking: checkIfIsTracking(project, task),
                }
            },
        )

        const newQuickActionTasksUnique = newQuickActionTasks.filter(
            (value, index, self) => {
                return self.findIndex((v) => v.taskId === value.taskId) === index
            },
        )

        setQuickActionTask(newQuickActionTasksUnique)
    }

    const getTaskDescription = (task?: TaskView): string | undefined => {
        if (!task) {
            return undefined
        }
        return task.name
    }

    return quickActionTask
}
