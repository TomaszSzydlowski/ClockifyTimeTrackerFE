import { createSlice } from '@reduxjs/toolkit'

import { reducers } from './reducers'

export interface qrCodeStoreModel {
    projectId?: string
    taskId?: string
}

const initialState: qrCodeStoreModel = {
    projectId: undefined,
    taskId: undefined,
}

export const qrCodeSlice = createSlice({
    name: 'qrCode',
    initialState,
    reducers,
})

export const qrCodeDefaultValueProvider = (): qrCodeStoreModel => initialState
export const qrCodeActions = qrCodeSlice.actions
