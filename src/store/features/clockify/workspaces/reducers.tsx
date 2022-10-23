import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { workspacesAsyncActions } from './asyncActions'
import { workspacesStoreModel } from './index'

export const reducers = {}

export const extraReducers = (
    builder: ActionReducerMapBuilder<workspacesStoreModel>,
): void => {
    builder.addCase(
        workspacesAsyncActions.getClockifyWorkspaces.fulfilled,
        (state, action) => {
            state.workspaces = action.payload
        },
    )
    builder.addCase(workspacesAsyncActions.getClockifyWorkspaces.rejected, (state) => {
        state.workspaces = undefined
    })
}
