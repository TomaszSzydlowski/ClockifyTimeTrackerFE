import { AnyAction } from '@reduxjs/toolkit'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { trackingAsyncActions } from '../../../store/features/clockify/tracking/asyncActions'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'

export const ClockifyIntervalRequests: FC = () => {
    const dispatch = useDispatch()
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)
    let intervalId: NodeJS.Timer | null = null
    const interval = 600_000 // 10 min

    useEffect(() => {
        if (!userId || !workspaceId || intervalId) return
        intervalId = setInterval(() => {
            dispatch(
                trackingAsyncActions.getClockifyTracking({
                    workspaceId,
                    userId,
                }) as unknown as AnyAction,
            )
        }, interval)
    }, [userId, workspaceId])

    useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [])

    return null
}
