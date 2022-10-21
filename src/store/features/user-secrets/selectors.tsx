import {StoreModel} from '../../index'

export const userSecretsSelectors = {
    getUserSecretsClockifyApiKey: (state: StoreModel): string | undefined => state.userSecrets.clockifyApiKey,
    getUserSecretsAzureDevOpsToken: (state: StoreModel): string | undefined => state.userSecrets.azureDevOpsToken
}
