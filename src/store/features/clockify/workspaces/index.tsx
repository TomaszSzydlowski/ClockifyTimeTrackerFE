import { createSlice } from '@reduxjs/toolkit'

import { Workspace } from '../../../../core/types/Workspace'
import { extraReducers, reducers } from './reducers'

export interface workspacesStoreModel {
    workspaces?: Workspace[]
}

const initialState: workspacesStoreModel = {
    workspaces: undefined,
}

export const workspacesSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers,
    extraReducers,
})

export const workspacesDefaultValueProvider = (): workspacesStoreModel => initialState
export const workspacesActions = workspacesSlice.actions
