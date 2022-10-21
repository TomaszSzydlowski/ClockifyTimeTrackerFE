import {configureStore} from '@reduxjs/toolkit'
import {modalDefaultValueProvider, modalSlice, ModalStoreModel} from './features/modals/modal'

export interface StoreModel {
    modal: ModalStoreModel;
}

const prepareServerDataToStore = (): StoreModel => ({
    modal: modalDefaultValueProvider(),
})

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
    },
    preloadedState: prepareServerDataToStore(),
    middleware: (defaultMiddleware) => defaultMiddleware({serializableCheck: false, })
})

export const buildStore = (): typeof store => store
