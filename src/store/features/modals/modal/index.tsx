import { createSlice } from '@reduxjs/toolkit'

import { ModalType } from '../../../../core/types/enums/ModalType'
import { reducers } from './reducers'

export interface Modal<T> {
    type: ModalType
    props?: T
}

export interface ModalStoreModel {
    modals: Modal<any>[]
}

const initialState: ModalStoreModel = { modals: [] }

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers,
})

export const modalDefaultValueProvider = (): ModalStoreModel => initialState
export const modalActions = modalSlice.actions
