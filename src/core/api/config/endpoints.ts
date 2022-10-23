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
    timeEntry: {
        get: (workspaceId: string, userId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/user/${userId}/time-entries`,
    },
}
