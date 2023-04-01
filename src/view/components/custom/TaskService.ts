export class TaskService {
    static getTaskUrl = (projectId: string, taskId: string | undefined) =>
        `/task?projectId=${projectId}&taskId=${taskId}`
}
