import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { tasksAsyncActions } from './asyncActions'
import { tasksStoreModel } from './index'

export const reducers = {}

export const extraReducers = (
    builder: ActionReducerMapBuilder<tasksStoreModel>,
): void => {
    builder.addCase(
        tasksAsyncActions.getClockifyLastTimeEntries.fulfilled,
        (state, action) => {
            state.timeEntries = action.payload
        },
    )
    builder.addCase(tasksAsyncActions.getClockifyLastTimeEntries.rejected, (state) => {
        state.timeEntries = []
    })
}
