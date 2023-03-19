import { StoreModel } from '../../../index'

export const userClockifySelectors = {
    getUserId: (state: StoreModel): string | undefined => state.clockifyUser.user?.id,
    getDefaultWorkspaceId: (state: StoreModel): string | undefined =>
        state.clockifyUser.user?.defaultWorkspace,
    getUserName: (state: StoreModel): string | undefined =>
        state.clockifyUser?.user?.name,
}
