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
                end: timeEntryRaw.timeInterval.end
                    ? dayjs(timeEntryRaw.timeInterval.end)
                    : undefined,
            },
        }))
    }

    static async startTracking(
        workspaceId: string,
        projectId: string,
        taskId?: string,
    ): Promise<TimeEntryView> {
        const { data } = await HttpClient.post<TimeEntryView>(
            endpoints.timeEntry.startTracking(workspaceId),
            {
                start: dayjs().toDate(),
                billable: true,
                description: '',
                projectId: projectId,
                taskId: taskId,
            },
        )
        return {
            id: data.id,
            description: data.description,
            projectId: data.projectId,
            taskId: data.taskId,
            workspaceId: data.workspaceId,
            userId: data.userId,
            timeInterval: {
                ...data.timeInterval,
                start: dayjs(data.timeInterval.start),
                end: data.timeInterval.end ? dayjs(data.timeInterval.end) : undefined,
            },
        }
    }

    static async stopTracking(
        workspaceId: string,
        userId: string,
    ): Promise<TimeEntryView> {
        const { data } = await HttpClient.patch<TimeEntryView>(
            endpoints.timeEntry.stopTracking(workspaceId, userId),
            {
                end: dayjs().toDate(),
            },
        )
        return {
            id: data.id,
            description: data.description,
            projectId: data.projectId,
            taskId: data.taskId,
            workspaceId: data.workspaceId,
            userId: data.userId,
            timeInterval: {
                ...data.timeInterval,
                start: dayjs(data.timeInterval.start),
                end: data.timeInterval.end ? dayjs(data.timeInterval.end) : undefined,
            },
        }
    }

    static async getInProgressTimeEntry(
        workspaceId: string,
        userId: string,
    ): Promise<TimeEntryView | undefined> {
        const { data } = await HttpClient.get<TimeEntryRaw[]>(
            endpoints.timeEntry.getInProgress(workspaceId, userId),
        )
        if (data.length === 0) return undefined

        const result = data.map((timeEntryRaw) => ({
            id: timeEntryRaw.id,
            description: timeEntryRaw.description,
            projectId: timeEntryRaw.projectId,
            taskId: timeEntryRaw.taskId,
            workspaceId: timeEntryRaw.workspaceId,
            userId: timeEntryRaw.userId,
            timeInterval: {
                ...timeEntryRaw.timeInterval,
                start: dayjs(timeEntryRaw.timeInterval.start),
                end: timeEntryRaw.timeInterval.end
                    ? dayjs(timeEntryRaw.timeInterval.end)
                    : undefined,
            },
        }))
        return result[0] //only one time entry can be track
    }
}
