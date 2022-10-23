import { TaskView } from '../../../../core/types/Task'
import { StoreModel } from '../../../index'

export const tasksClockifySelectors = {
    getTasks: (state: StoreModel): TaskView[] | undefined => state.clockifyTasks.tasks,
}
