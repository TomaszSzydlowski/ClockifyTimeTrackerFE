import { createAsyncThunk } from '@reduxjs/toolkit'

import ClockifyTaskApi from '../../../../core/api/ClockifyTaskApi'

export const tasksAsyncActions = {
    getClockifyTasksForProjectsIds: createAsyncThunk(
        'tasks-clockify/getTasks',
        async (payload: { workspaceId: string; projectsIds: string[] }) => {
            return await ClockifyTaskApi.getForProjectsIds(
                payload.workspaceId,
                payload.projectsIds,
            )
        },
    ),
}
