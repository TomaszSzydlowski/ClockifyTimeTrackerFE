import { createAsyncThunk } from '@reduxjs/toolkit'

import WorkspaceApi from '../../../../core/api/WorkspaceApi'

export const workspacesAsyncActions = {
    getClockifyWorkspaces: createAsyncThunk(
        'workspaces-clockify/getWorkspaces',
        async () => {
            return await WorkspaceApi.get()
        },
    ),
}
