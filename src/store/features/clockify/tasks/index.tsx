import { createSlice } from '@reduxjs/toolkit'

import { TaskView } from '../../../../core/types/Task'
import { extraReducers, reducers } from './reducers'

export interface tasksStoreModel {
    tasks?: TaskView[]
}

const initialState: tasksStoreModel = {
    tasks: undefined,
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers,
    extraReducers,
})

export const tasksDefaultValueProvider = (): tasksStoreModel => initialState
export const tasksActions = tasksSlice.actions
