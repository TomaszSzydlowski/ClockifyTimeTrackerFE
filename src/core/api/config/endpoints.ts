const clockifyBaseApi = 'https://api.clockify.me/api/v1'

export const endpoints = {
    user: {
        get: `${clockifyBaseApi}/user`,
    },
    workspace: {
        get: `${clockifyBaseApi}/workspaces`,
    },
    projects: {
        get: (workspaceId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/projects`,
    },
    tasks: {
        get: (workspaceId: string, projectId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    },
    timeEntry: {
        get: (workspaceId: string, userId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/user/${userId}/time-entries`,
    },
}
