import { createAsyncThunk } from '@reduxjs/toolkit'

import ClockifyTimeEntryApi from '../../../../core/api/ClockifyTimeEntryApi'

export const trackingAsyncActions = {
    getClockifyTracking: createAsyncThunk(
        'tracking-clockify/getTracking',
        async (payload: { userId: string; workspaceId: string }) => {
            return await ClockifyTimeEntryApi.getInProgressTimeEntry(
                payload.workspaceId,
                payload.userId,
            )
        },
    ),
}
