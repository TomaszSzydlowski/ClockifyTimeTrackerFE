import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { lastTimeEntriesSelectors } from '../../store/features/clockify/last-time-entries/selectors'
import { projectsClockifySelectors } from '../../store/features/clockify/projects/selectors'
import { trackingClockifySelectors } from '../../store/features/clockify/tracking/selectors'
import { ProjectTag } from '../../view/components/custom/TaskCard'
import { ProjectView, TaskView } from '../types/Project'
import { QuickActionTask } from '../types/QuickActionTask'
import { TimeEntryView } from '../types/TimeEntry'

export const useQuickActionTasks = (): QuickActionTask[] => {
    const lastTimeEntries = useSelector(lastTimeEntriesSelectors.getLastTimeEntries)
    const projects = useSelector(projectsClockifySelectors.getProjects)
    const tracking = useSelector(trackingClockifySelectors.getTracking)

    const [quickActionTask, setQuickActionTask] = useState<QuickActionTask[]>([])

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

    const mapToTags = (project?: ProjectView): ProjectTag[] => {
        if (!project) return []

        const regex = /\B- #\w+/
        const tagsDescription = project.name.replace(regex, '').split(' - ')
        return tagsDescription.map((tag) => ({
            text: tag,
            color: project.color,
        }))
    }

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
                    description: getTaskDescription(task) ?? lastTimeEntry.description,
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
