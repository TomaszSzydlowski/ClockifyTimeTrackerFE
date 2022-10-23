import { Workspace } from '../../../../core/types/Workspace'
import { StoreModel } from '../../../index'

export const workspacesClockifySelectors = {
    getWorkspaces: (state: StoreModel): Workspace[] | undefined =>
        state.clockifyWorkspaces.workspaces,
}
