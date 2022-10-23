interface HourlyRate {
    amount: string
    currency: string
}

interface CostRate {
    amount: string
    currency: string
}

interface Membership {
    hourlyRate: HourlyRate
    costRate: CostRate
    membershipStatus: string
    membershipType: string
    targetId: string
    userId: string
}

interface SummaryReportSettings {
    group: string
    subgroup: string
}

interface Settings {
    collapseAllProjectLists: string
    dashboardPinToTop: string
    dashboardSelection: string
    dashboardViewType: string
    dateFormat: string
    isCompactViewOn: string
    longRunning: string
    projectListCollapse?: any
    sendNewsletter: string
    summaryReportSettings: SummaryReportSettings
    timeFormat: string
    timeTrackingManual: string
    timeZone: string
    weekStart: string
    weeklyUpdates: string
}

export interface User {
    activeWorkspace: string
    defaultWorkspace: string
    email: string
    id: string
    memberships: Membership[]
    name: string
    profilePicture: string
    settings: Settings
    status: string
}
