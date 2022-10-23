import HttpClient from '../helpers/HttpClient'
import { TaskRaw, TaskView } from '../types/Task'
import { endpoints } from './config/endpoints'

export default class ClockifyTaskApi {
    static async get(workspaceId: string, projectId: string): Promise<TaskView[]> {
        const { data } = await HttpClient.get<TaskRaw[]>(
            endpoints.tasks.get(workspaceId, projectId),
        )

        return data.map((taskRaw) => ({
            id: taskRaw.id,
            name: taskRaw.name,
            projectId: taskRaw.projectId,
        }))
    }

    static async getForProjectsIds(
        workspaceId: string,
        projectIds: string[],
    ): Promise<TaskView[]> {
        const allTasks: TaskView[] = []
        const promises = projectIds.map(async (projectId) => {
            const { data } = await HttpClient.get<TaskRaw[]>(
                endpoints.tasks.get(workspaceId, projectId),
            )
            const taskView: TaskView[] = data.map((taskRaw) => ({
                id: taskRaw.id,
                name: taskRaw.name,
                projectId: taskRaw.projectId,
            }))
            allTasks.push(...taskView)
        })
        await Promise.all(promises)
        return allTasks
    }
}
