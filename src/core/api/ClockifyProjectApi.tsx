import HttpClient from '../helpers/HttpClient'
import { ProjectRaw, ProjectView } from '../types/Project'
import { endpoints } from './config/endpoints'

export default class ClockifyProjectApi {
    static async get(workspaceId: string): Promise<ProjectView[]> {
        const { data } = await HttpClient.get<ProjectRaw[]>(
            endpoints.projects.get(workspaceId),
        )

        return data.map((projectRaw) => ({
            id: projectRaw.id,
            name: projectRaw.name,
            color: projectRaw.color,
            tasks: projectRaw.tasks.map((taskRaw) => ({
                id: taskRaw.id,
                name: taskRaw.name,
                projectId: taskRaw.projectId,
                status: taskRaw.status,
            })),
        }))
    }
}
