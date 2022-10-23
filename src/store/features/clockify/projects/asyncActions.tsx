import { createAsyncThunk } from '@reduxjs/toolkit'

import ClockifyProjectApi from '../../../../core/api/ClockifyProjectApi'

export const projectsAsyncActions = {
    getClockifyProjects: createAsyncThunk(
        'projects-clockify/getProjects',
        async (workspaceId: string) => {
            return await ClockifyProjectApi.get(workspaceId)
        },
    ),
}
