interface HourlyRate {
    amount: string
    currency: string
}

interface Membership {
    hourlyRate: HourlyRate
    membershipStatus: string
    membershipType: string
    targetId: string
    userId: string
}

interface AutomaticLock {
    changeDay: string
    dayOfMonth: string
    firstDay: string
    olderThanPeriod: string
    olderThanValue: string
    type: string
}

interface Round {
    minutes: string
    round: string
}

interface WorkspaceSettings {
    adminOnlyPages: any[]
    automaticLock: AutomaticLock
    canSeeTimeSheet: string
    canSeeTracker: string
    defaultBillableProjects: string
    forceDescription: string
    forceProjects: string
    forceTags: string
    forceTasks: string
    lockTimeEntries: Date
    onlyAdminsCreateProject: string
    onlyAdminsCreateTag: string
    onlyAdminsCreateTask: string
    onlyAdminsSeeAllTimeEntries: string
    onlyAdminsSeeBillableRates: string
    onlyAdminsSeeDashboard: string
    onlyAdminsSeePublicProjectsEntries: string
    projectFavorites: string
    projectGroupingLabel: string
    projectPickerSpecialFilter: string
    round: Round
    timeRoundingInReports: string
    trackTimeDownToSecond: string
    isProjectPublicByDefault: string
    featureSubscriptionType: string
}

export interface Workspace {
    id: string
    imageUrl: string
    memberships: Membership[]
    name: string
    workspaceSettings: WorkspaceSettings
}
