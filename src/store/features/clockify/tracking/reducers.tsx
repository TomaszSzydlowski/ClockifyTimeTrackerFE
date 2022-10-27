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
}
