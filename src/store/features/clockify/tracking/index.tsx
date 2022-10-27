import { createSlice } from '@reduxjs/toolkit'

import { TimeEntryView } from '../../../../core/types/TimeEntry'
import { extraReducers, reducers } from './reducers'

export interface trackingStoreModel {
    tracking?: TimeEntryView
}

const initialState: trackingStoreModel = {
    tracking: undefined,
}

export const trackingSlice = createSlice({
    name: 'tracking',
    initialState,
    reducers,
    extraReducers,
})

export const trackingDefaultValueProvider = (): trackingStoreModel => initialState
export const trackingActions = trackingSlice.actions
