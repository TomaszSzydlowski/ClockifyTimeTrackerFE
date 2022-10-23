import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { userAsyncActions } from './asyncActions'
import { userStoreModel } from './index'

export const reducers = {}

export const extraReducers = (builder: ActionReducerMapBuilder<userStoreModel>): void => {
    builder.addCase(userAsyncActions.getClockifyUser.fulfilled, (state, action) => {
        state.user = action.payload
    })
    builder.addCase(userAsyncActions.getClockifyUser.rejected, (state) => {
        state.user = undefined
    })
}
