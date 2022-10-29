import { ProjectView } from '../../../../core/types/Project'
import { StoreModel } from '../../../index'

export const projectsClockifySelectors = {
    getProjects: (state: StoreModel): ProjectView[] | undefined =>
        state.clockifyProjects.projects,
}
