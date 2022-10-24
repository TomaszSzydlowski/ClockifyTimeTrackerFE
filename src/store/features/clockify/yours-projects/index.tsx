import { createSlice } from '@reduxjs/toolkit'

import { reducers } from './reducers'

export interface yoursProjectsStoreModel {
    yoursProjects?: string[]
}

const initialState: yoursProjectsStoreModel = {
    yoursProjects: undefined,
}

export const yoursProjectsSlice = createSlice({
    name: 'yoursProjects',
    initialState,
    reducers,
})

export const yoursProjectsDefaultValueProvider = (): yoursProjectsStoreModel =>
    initialState
export const yoursProjectsActions = yoursProjectsSlice.actions
