﻿import { AnyAction } from '@reduxjs/toolkit'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useQuickActionTasks } from '../../../core/hooks/useQuickActionTasks'
import { trackingAsyncActions } from '../../../store/features/clockify/tracking/asyncActions'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'
import { TaskCard } from './TaskCard'
import { TaskService } from './TaskService'

export const Tasks: FC = () => {
    const dispatch = useDispatch()

    const quickActionTask = useQuickActionTasks()
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)

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
        <div>
            {quickActionTask.map((quickActionTask, index) => (
                <TaskCard
                    key={index}
                    description={quickActionTask.description}
                    projectTags={quickActionTask.tags}
                    taskUrl={TaskService.getTaskUrl(
                        quickActionTask.projectId,
                        quickActionTask.taskId,
                    )}
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
        </div>
    )
}
