import { createAsyncThunk } from '@reduxjs/toolkit'

import TimeEntryApi from '../../../../core/api/ClockifyTimeEntryApi'

export const lastTimeEntriesAsyncActions = {
    getClockifyLastTimeEntries: createAsyncThunk(
        'last-time-entries-clockify/getClockifyLastTimeEntries',
        async (payload: { userId: string; workspaceId: string }) => {
            return await TimeEntryApi.get(payload.workspaceId, payload.userId)
        },
    ),
}
