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
    startTracking: createAsyncThunk(
        'tracking-clockify/startTracking',
        async (payload: { workspaceId: string; projectId: string; taskId?: string }) => {
            return await ClockifyTimeEntryApi.startTracking(
                payload.workspaceId,
                payload.projectId,
                payload.taskId,
            )
        },
    ),
    stopTracking: createAsyncThunk(
        'tracking-clockify/stopTracking',
        async (payload: { workspaceId: string; userId: string }) => {
            return await ClockifyTimeEntryApi.stopTracking(
                payload.workspaceId,
                payload.userId,
            )
        },
    ),
}
