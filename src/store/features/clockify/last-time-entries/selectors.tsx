import { TimeEntryView } from '../../../../core/types/TimeEntry'
import { StoreModel } from '../../../index'

export const lastTimeEntriesSelectors = {
    getLastTimeEntries: (state: StoreModel): TimeEntryView[] | undefined =>
        state.clockifyLastTimeEntries.timeEntries,
}
