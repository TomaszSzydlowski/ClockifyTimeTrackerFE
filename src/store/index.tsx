import { configureStore } from '@reduxjs/toolkit'

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
    workspacesDefaultValueProvider,
    workspacesSlice,
    workspacesStoreModel,
} from './features/clockify/workspaces'
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
    clockifyWorkspaces: workspacesStoreModel
    clockifyLastTimeEntries: lastTimeEntriesStoreModel
    clockifyProjects: projectsStoreModel
}

const prepareServerDataToStore = (): StoreModel => ({
    modal: modalDefaultValueProvider(),
    userSecrets: userSecretsDefaultValueProvider(),
    clockifyUser: userDefaultValueProvider(),
    clockifyWorkspaces: workspacesDefaultValueProvider(),
    clockifyLastTimeEntries: lastTimeEntriesDefaultValueProvider(),
    clockifyProjects: projectsDefaultValueProvider(),
})

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        userSecrets: userSecretsSlice.reducer,
        clockifyUser: userSlice.reducer,
        clockifyWorkspaces: workspacesSlice.reducer,
        clockifyLastTimeEntries: lastTimeEntriesSlice.reducer,
        clockifyProjects: projectsSlice.reducer,
    },
    preloadedState: prepareServerDataToStore(),
    middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
})

export const buildStore = (): typeof store => store
