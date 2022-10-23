import { createSlice } from '@reduxjs/toolkit'

import { TimeEntryView } from '../../../../core/types/TimeEntry'
import { extraReducers, reducers } from './reducers'

export interface tasksStoreModel {
    timeEntries: TimeEntryView[]
}

const initialState: tasksStoreModel = {
    timeEntries: [],
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers,
    extraReducers,
})

export const tasksDefaultValueProvider = (): tasksStoreModel => initialState
export const tasksActions = tasksSlice.actions
