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
            `${clockifyBaseApi}/workspaces/${workspaceId}/projects?hydrated=true&page-size=5000`,
    },
    tasks: {
        get: (workspaceId: string, projectId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    },
    timeEntry: {
        get: (workspaceId: string, userId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/user/${userId}/time-entries`,
        getInProgress: (workspaceId: string, userId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/user/${userId}/time-entries?in-progress=true`,
        startTracking: (workspaceId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/time-entries`,
        stopTracking: (workspaceId: string, userId: string) =>
            `${clockifyBaseApi}/workspaces/${workspaceId}/user/${userId}/time-entries`,
    },
}
