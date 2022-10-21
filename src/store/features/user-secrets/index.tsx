import { createSlice } from '@reduxjs/toolkit'

import { reducers } from './reducers'

export interface userSecretsStoreModel {
    clockifyApiKey?: string
    azureDevOpsToken?: string
}

const initialState: userSecretsStoreModel = {
    clockifyApiKey: undefined,
    azureDevOpsToken: undefined,
}

export const userSecretsSlice = createSlice({
    name: 'userSecrets',
    initialState,
    reducers,
})

export const userSecretsDefaultValueProvider = (): userSecretsStoreModel => initialState
export const userSecretsActions = userSecretsSlice.actions
