import { createSlice } from '@reduxjs/toolkit'

import { ProjectView } from '../../../../core/types/Project'
import { extraReducers, reducers } from './reducers'

export interface projectsStoreModel {
    projects?: ProjectView[]
}

const initialState: projectsStoreModel = {
    projects: undefined,
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers,
    extraReducers,
})

export const projectsDefaultValueProvider = (): projectsStoreModel => initialState
export const projectsActions = projectsSlice.actions
