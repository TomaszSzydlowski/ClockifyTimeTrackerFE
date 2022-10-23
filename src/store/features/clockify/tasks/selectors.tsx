import { TimeEntryView } from '../../../../core/types/TimeEntry'
import { StoreModel } from '../../../index'

export const tasksSelectors = {
    getLastTimeEntries: (state: StoreModel): TimeEntryView[] | undefined =>
        state.clockifyTasks.timeEntries,
}
