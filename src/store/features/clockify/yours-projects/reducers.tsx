import { yoursProjectsStoreModel } from './index'

export const reducers = {
    setYoursProjects(
        state: yoursProjectsStoreModel,
        { payload }: { payload: string[] },
    ): void {
        state.yoursProjects = payload
    },
}

export const extraReducers = {}
