import { AnyAction } from '@reduxjs/toolkit'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userAsyncActions } from '../../../store/features/clockify/user/asyncActions'
import { workspacesAsyncActions } from '../../../store/features/clockify/workspaces/asyncActions'
import { userSecretsSelectors } from '../../../store/features/user-secrets/selectors'

export const ClockifyInitialData: FC = () => {
    const dispatch = useDispatch()
    const clockifyApiKey = useSelector(userSecretsSelectors.getUserSecretsClockifyApiKey)

    useEffect(() => {
        if (clockifyApiKey !== undefined) {
            dispatch(userAsyncActions.getClockifyUser() as unknown as AnyAction)
            dispatch(
                workspacesAsyncActions.getClockifyWorkspaces() as unknown as AnyAction,
            )
        }
    }, [clockifyApiKey])

    return null
}
