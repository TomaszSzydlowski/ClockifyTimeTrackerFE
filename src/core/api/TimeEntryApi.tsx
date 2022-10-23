import dayjs from 'dayjs'

import HttpClient from '../helpers/HttpClient'
import { TimeEntryRaw, TimeEntryView } from '../types/TimeEntry'
import { endpoints } from './config/endpoints'

export default class TimeEntryApi {
    static async get(workspaceId: string, userId: string): Promise<TimeEntryView[]> {
        const { data } = await HttpClient.get<TimeEntryRaw[]>(
            endpoints.timeEntry.get(workspaceId, userId),
        )

        return data.map((timeEntryRaw) => ({
            ...timeEntryRaw,
            timeInterval: {
                ...timeEntryRaw.timeInterval,
                start: dayjs(timeEntryRaw.timeInterval.start),
                end: dayjs(timeEntryRaw.timeInterval.end),
            },
        }))
    }
}
