interface HourlyRate {
    amount: number
    currency: string
}

interface Membership {
    userId: string
    hourlyRate?: any
    costRate?: any
    targetId: string
    membershipType: string
    membershipStatus: string
}

interface Estimate {
    estimate: string
    type: string
}

interface Task {
    id: string
    name: string
    projectId: string
    assigneeIds: any[]
    assigneeId?: any
    userGroupIds: any[]
    estimate: string
    status: string
    duration?: any
    billable: boolean
    hourlyRate?: any
    costRate?: any
}

interface TimeEstimate {
    estimate: string
    type: string
    resetOption?: any
    active: boolean
    includeNonBillable: boolean
}

interface CustomField {
    customFieldId: string
    name: string
    type: string
    value: string
    status: string
}

export interface ProjectRaw {
    id: string
    name: string
    hourlyRate: HourlyRate
    clientId: string
    client: string
    workspaceId: string
    billable: boolean
    memberships: Membership[]
    color: string
    estimate: Estimate
    archived: boolean
    tasks: Task[]
    note: string
    duration: string
    costRate?: any
    timeEstimate: TimeEstimate
    budgetEstimate?: any
    customFields: CustomField[]
    public: boolean
    template: boolean
    favorite: boolean
}

export interface ProjectView {
    id: string
    name: string
    color: string
}
