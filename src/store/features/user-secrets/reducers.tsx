import { userSecretsStoreModel } from './index'

export const reducers = {
    setClockifyApiKey(
        state: userSecretsStoreModel,
        { payload }: { payload: { clockifyApiKey: string } },
    ): void {
        state.clockifyApiKey = payload.clockifyApiKey
    },
    setAzureDevOpsToken(
        state: userSecretsStoreModel,
        { payload }: { payload: { azureDevOpsToken: string } },
    ): void {
        state.azureDevOpsToken = payload.azureDevOpsToken
    },
}
