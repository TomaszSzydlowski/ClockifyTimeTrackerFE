import { AnyAction } from '@reduxjs/toolkit'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { projectsAsyncActions } from '../../../store/features/clockify/projects/asyncActions'
import { userAsyncActions } from '../../../store/features/clockify/user/asyncActions'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'
import { userSecretsSelectors } from '../../../store/features/user-secrets/selectors'

export const ClockifyInitialData: FC = () => {
    const dispatch = useDispatch()
    const clockifyApiKey = useSelector(userSecretsSelectors.getUserSecretsClockifyApiKey)
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)

    useEffect(() => {
        if (clockifyApiKey !== undefined) {
            dispatch(userAsyncActions.getClockifyUser() as unknown as AnyAction)
        }
    }, [clockifyApiKey])

    useEffect(() => {
        if (userId !== undefined && workspaceId !== undefined)
            dispatch(
                projectsAsyncActions.getClockifyProjects(
                    workspaceId,
                ) as unknown as AnyAction,
            )
    }, [userId, workspaceId])

    return null
}
