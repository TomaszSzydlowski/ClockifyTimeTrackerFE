import { ProjectTag } from '../../view/components/custom/TaskCard'

export interface QuickActionTask {
    description?: string
    tags?: ProjectTag[]
    taskId?: string
    projectId: string
    isTracking: boolean
}
