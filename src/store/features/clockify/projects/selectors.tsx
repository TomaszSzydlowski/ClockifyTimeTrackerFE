import { ProjectView } from '../../../../core/types/Project'
import { StoreModel } from '../../../index'

export const projectsClockifySelectors = {
    getprojects: (state: StoreModel): ProjectView[] | undefined =>
        state.clockifyProjects.projects,
}
