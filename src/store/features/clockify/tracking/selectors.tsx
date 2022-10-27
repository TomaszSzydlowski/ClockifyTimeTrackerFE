import { TimeEntryView } from '../../../../core/types/TimeEntry'
import { StoreModel } from '../../../index'

export const trackingClockifySelectors = {
    getTracking: (state: StoreModel): TimeEntryView | undefined =>
        state.clockifyTracking.tracking,
}
