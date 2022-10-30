import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { trackingAsyncActions } from './asyncActions'
import { trackingStoreModel } from './index'

export const reducers = {}

export const extraReducers = (
    builder: ActionReducerMapBuilder<trackingStoreModel>,
): void => {
    builder.addCase(
        trackingAsyncActions.getClockifyTracking.fulfilled,
        (state, action) => {
            state.tracking = action.payload
        },
    )
    builder.addCase(trackingAsyncActions.getClockifyTracking.rejected, (state) => {
        state.tracking = undefined
    })
    builder.addCase(trackingAsyncActions.startTracking.fulfilled, (state, action) => {
        state.tracking = { ...action.payload, taskId: action.meta.arg.taskId } // because response do not return taskId
    })
    builder.addCase(trackingAsyncActions.stopTracking.fulfilled, (state, action) => {
        state.tracking = { ...action.payload, taskId: state.tracking?.taskId } // because response do not return taskId
    })
}
