import { createSlice } from '@reduxjs/toolkit'

import { TimeEntryView } from '../../../../core/types/TimeEntry'
import { extraReducers, reducers } from './reducers'

export interface lastTimeEntriesStoreModel {
    timeEntries: TimeEntryView[]
}

const initialState: lastTimeEntriesStoreModel = {
    timeEntries: [],
}

export const lastTimeEntriesSlice = createSlice({
    name: 'last-time-entries',
    initialState,
    reducers,
    extraReducers,
})

export const lastTimeEntriesDefaultValueProvider = (): lastTimeEntriesStoreModel =>
    initialState
export const lastTimeEntriesActions = lastTimeEntriesSlice.actions
