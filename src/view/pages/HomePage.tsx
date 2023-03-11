import { AnyAction } from '@reduxjs/toolkit'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { lastTimeEntriesAsyncActions } from '../../store/features/clockify/last-time-entries/asyncActions'
import { userClockifySelectors } from '../../store/features/clockify/user/selectors'
import { Tasks } from '../components/custom/Tasks'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const HomePage: FC = () => {
    const dispatch = useDispatch()
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)

    useEffect(() => {
        if (!userId || !workspaceId) return
        dispatch(
            lastTimeEntriesAsyncActions.getClockifyLastTimeEntries({
                userId,
                workspaceId,
            }) as unknown as AnyAction,
        )
    }, [userId, workspaceId])

    return (
        <BaseLayout isHeader>
            <div className="home_page_box">
                <Tasks />
            </div>
        </BaseLayout>
    )
}
