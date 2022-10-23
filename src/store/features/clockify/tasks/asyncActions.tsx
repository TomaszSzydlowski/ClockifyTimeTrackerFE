import { createAsyncThunk } from '@reduxjs/toolkit'

import TimeEntryApi from '../../../../core/api/TimeEntryApi'

export const tasksAsyncActions = {
    getClockifyLastTimeEntries: createAsyncThunk(
        'task-clockify/getClockifyLastTimeEntries',
        async (payload: { userId: string; workspaceId: string }) => {
            return await TimeEntryApi.get(payload.workspaceId, payload.userId)
        },
    ),
}
