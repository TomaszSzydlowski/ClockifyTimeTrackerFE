import { createAsyncThunk } from '@reduxjs/toolkit'

import UserApi from '../../../../core/api/UserApi'

export const userAsyncActions = {
    getClockifyUser: createAsyncThunk('user-clockify/getUser', async () => {
        return await UserApi.get()
    }),
}
