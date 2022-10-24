﻿import { configureStore } from '@reduxjs/toolkit'

import {
    lastTimeEntriesDefaultValueProvider,
    lastTimeEntriesSlice,
    lastTimeEntriesStoreModel,
} from './features/clockify/last-time-entries'
import {
    projectsDefaultValueProvider,
    projectsSlice,
    projectsStoreModel,
} from './features/clockify/projects'
import {
    userDefaultValueProvider,
    userSlice,
    userStoreModel,
} from './features/clockify/user'
import {
    yoursProjectsDefaultValueProvider,
    yoursProjectsSlice,
    yoursProjectsStoreModel,
} from './features/clockify/yours-projects'
import {
    modalDefaultValueProvider,
    modalSlice,
    ModalStoreModel,
} from './features/modals/modal'
import {
    userSecretsDefaultValueProvider,
    userSecretsSlice,
    userSecretsStoreModel,
} from './features/user-secrets'

export interface StoreModel {
    modal: ModalStoreModel
    userSecrets: userSecretsStoreModel
    clockifyUser: userStoreModel
    clockifyLastTimeEntries: lastTimeEntriesStoreModel
    clockifyProjects: projectsStoreModel
    yoursProjects: yoursProjectsStoreModel
}

const prepareServerDataToStore = (): StoreModel => ({
    modal: modalDefaultValueProvider(),
    userSecrets: userSecretsDefaultValueProvider(),
    clockifyUser: userDefaultValueProvider(),
    clockifyLastTimeEntries: lastTimeEntriesDefaultValueProvider(),
    clockifyProjects: projectsDefaultValueProvider(),
    yoursProjects: yoursProjectsDefaultValueProvider(),
})

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        userSecrets: userSecretsSlice.reducer,
        clockifyUser: userSlice.reducer,
        clockifyLastTimeEntries: lastTimeEntriesSlice.reducer,
        clockifyProjects: projectsSlice.reducer,
        yoursProjects: yoursProjectsSlice.reducer,
    },
    preloadedState: prepareServerDataToStore(),
    middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
})

export const buildStore = (): typeof store => store
