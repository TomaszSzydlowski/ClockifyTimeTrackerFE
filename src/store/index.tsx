import {configureStore} from '@reduxjs/toolkit'
import {modalDefaultValueProvider, modalSlice, ModalStoreModel} from './features/modals/modal'
import {userSecretsDefaultValueProvider, userSecretsSlice, userSecretsStoreModel} from "./features/user-secrets"

export interface StoreModel {
    modal: ModalStoreModel;
    userSecrets: userSecretsStoreModel;
}

const prepareServerDataToStore = (): StoreModel => ({
    modal: modalDefaultValueProvider(),
    userSecrets: userSecretsDefaultValueProvider(),

})

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        userSecrets: userSecretsSlice.reducer,
    },
    preloadedState: prepareServerDataToStore(),
    middleware: (defaultMiddleware) => defaultMiddleware({serializableCheck: false, })
})

export const buildStore = (): typeof store => store
