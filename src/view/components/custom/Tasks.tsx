import { AnyAction } from '@reduxjs/toolkit'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useClockifyWorkspaceId } from '../../../core/hooks/useIdToken'
import { lastTimeEntriesAsyncActions } from '../../../store/features/clockify/last-time-entries/asyncActions'
import { lastTimeEntriesSelectors } from '../../../store/features/clockify/last-time-entries/selectors'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'
import { Task } from './Task'

export const Tasks: FC = () => {
    const dispatch = useDispatch()
    const lastTimeEntries = useSelector(lastTimeEntriesSelectors.getLastTimeEntries)
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useClockifyWorkspaceId()

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
