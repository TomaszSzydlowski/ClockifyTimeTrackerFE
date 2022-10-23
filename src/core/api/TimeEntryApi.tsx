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
            id: timeEntryRaw.id,
            description: timeEntryRaw.description,
            projectId: timeEntryRaw.projectId,
            taskId: timeEntryRaw.taskId,
            workspaceId: timeEntryRaw.workspaceId,
            userId: timeEntryRaw.userId,
            timeInterval: {
                ...timeEntryRaw.timeInterval,
                start: dayjs(timeEntryRaw.timeInterval.start),
                end: dayjs(timeEntryRaw.timeInterval.end),
            },
        }))
    }

    static async startTracking(
        workspaceId: string,
        projectId: string,
        taskId: string,
    ): Promise<void> {
        const { data } = await HttpClient.post(
            endpoints.timeEntry.startTracking(workspaceId),
            {
                start: dayjs().toDate(),
                billable: true,
                description: '',
                projectId: projectId,
                taskId: taskId,
            },
        )
    }
}
