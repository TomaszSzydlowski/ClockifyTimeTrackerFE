import { createSlice } from '@reduxjs/toolkit'

import { User } from '../../../../core/types/User'
import { extraReducers, reducers } from './reducers'

export interface userStoreModel {
    user?: User
}

const initialState: userStoreModel = {
    user: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers,
    extraReducers,
})

export const userDefaultValueProvider = (): userStoreModel => initialState
export const userActions = userSlice.actions
