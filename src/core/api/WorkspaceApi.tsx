import HttpClient from '../helpers/HttpClient'
import { Workspace } from '../types/Workspace'
import { endpoints } from './config/endpoints'

export default class WorkspaceApi {
    static async get(): Promise<Workspace[]> {
        const { data } = await HttpClient.get<Workspace[]>(endpoints.workspace.get)

        return data
    }
}
