interface HourlyRate {
    amount: string
    currency: string
}

interface CostRate {
    amount: string
    currency: string
}

export interface TaskRaw {
    assigneeIds: string[]
    estimate: string
    id: string
    name: string
    projectId: string
    billable: string
    hourlyRate: HourlyRate
    costRate: CostRate
    status: string
}

export interface TaskView {
    id: string
    name: string
    projectId: string
}
