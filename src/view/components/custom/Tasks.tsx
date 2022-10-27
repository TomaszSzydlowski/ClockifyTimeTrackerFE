import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import TimeEntryApi from '../../../core/api/ClockifyTimeEntryApi'
import { useQuickActionTasks } from '../../../core/hooks/useQuickActionTasks'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'
import { TaskCard } from './TaskCard'

export const Tasks: FC = () => {
    const quickActionTask = useQuickActionTasks()
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)

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
                    isNowTracking={quickActionTask.isTracking}
                />
            ))}
        </div>
    )
}
