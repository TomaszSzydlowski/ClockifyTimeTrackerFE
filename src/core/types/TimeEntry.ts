import { Dayjs } from 'dayjs'

export interface TimeEntryRaw {
    billable: boolean
    description: string
    id: string
    isLocked: boolean
    projectId: string
    tagIds: string[]
    taskId: string
    timeInterval: TimeIntervalRaw
    userId: string
    workspaceId: string
}

export interface TimeIntervalRaw {
    duration: string
    end: Date
    start: Date
}

export interface TimeIntervalView {
    duration: string
    end: Dayjs
    start: Dayjs
}

export interface TimeEntryView extends Omit<TimeEntryRaw, 'timeInterval'> {
    timeInterval: TimeIntervalView
}
