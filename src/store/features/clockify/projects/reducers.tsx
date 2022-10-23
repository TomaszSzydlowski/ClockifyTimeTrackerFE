import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { projectsAsyncActions } from './asyncActions'
import { projectsStoreModel } from './index'

export const reducers = {}

export const extraReducers = (
    builder: ActionReducerMapBuilder<projectsStoreModel>,
): void => {
    builder.addCase(
        projectsAsyncActions.getClockifyProjects.fulfilled,
        (state, action) => {
            state.projects = action.payload
        },
    )
    builder.addCase(projectsAsyncActions.getClockifyProjects.rejected, (state) => {
        state.projects = undefined
    })
}
