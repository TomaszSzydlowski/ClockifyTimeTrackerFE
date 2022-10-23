import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { lastTimeEntriesAsyncActions } from './asyncActions'
import { lastTimeEntriesStoreModel } from './index'

export const reducers = {}

export const extraReducers = (
    builder: ActionReducerMapBuilder<lastTimeEntriesStoreModel>,
): void => {
    builder.addCase(
        lastTimeEntriesAsyncActions.getClockifyLastTimeEntries.fulfilled,
        (state, action) => {
            state.timeEntries = action.payload
        },
    )
    builder.addCase(
        lastTimeEntriesAsyncActions.getClockifyLastTimeEntries.rejected,
        (state) => {
            state.timeEntries = []
        },
    )
}
