import { StoreModel } from '../../../index'

export const yoursProjectsSelectors = {
    getYoursProjects: (state: StoreModel): string[] | undefined =>
        state.yoursProjects.yoursProjects,
}
