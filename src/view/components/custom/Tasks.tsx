import { AnyAction } from '@reduxjs/toolkit'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useClockifyWorkspaceId } from '../../../core/hooks/useIdToken'
import { tasksAsyncActions } from '../../../store/features/clockify/tasks/asyncActions'
import { tasksSelectors } from '../../../store/features/clockify/tasks/selectors'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'
import { workspacesClockifySelectors } from '../../../store/features/clockify/workspaces/selectors'
import { userSecretsSelectors } from '../../../store/features/user-secrets/selectors'
import { Task } from './Task'

export const Tasks: FC = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(tasksSelectors.getLastTimeEntries)
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useClockifyWorkspaceId()

    useEffect(() => {
        if (userId !== undefined && workspaceId !== undefined) {
            dispatch(
                tasksAsyncActions.getClockifyLastTimeEntries({
                    userId,
                    workspaceId,
                }) as unknown as AnyAction,
            )
        }
    }, [userId, workspaceId])

    return (
        <div className="tasks_list">
            <Task
                title={
                    '#15158 W2G8 // Project Management -> Shifts: Self registration and Self unregistration'
                }
                projectTags={[
                    { text: 'W2G8', color: '#87d068' },
                    { text: 'Q4 2022', color: '#87d068' },
                    {
                        text: 'New features',
                        color: '#87d068',
                    },
                    { text: 'Inventuren', color: '#87d068' },
                ]}
            />
        </div>
    )
}
