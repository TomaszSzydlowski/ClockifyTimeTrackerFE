import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { tasksAsyncActions } from './asyncActions'
import { tasksStoreModel } from './index'

export const reducers = {}

export const extraReducers = (
    builder: ActionReducerMapBuilder<tasksStoreModel>,
): void => {
    builder.addCase(
        tasksAsyncActions.getClockifyTasksForProjectsIds.fulfilled,
        (state, action) => {
            state.tasks = action.payload
        },
    )
    builder.addCase(
        tasksAsyncActions.getClockifyTasksForProjectsIds.rejected,
        (state) => {
            state.tasks = undefined
        },
    )
}
