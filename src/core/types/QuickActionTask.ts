import { projectTag } from '../../view/components/custom/TaskCard'

export interface QuickActionTask {
    description?: string
    tags?: projectTag[]
    taskId: string
    projectId: string
    isTracking: boolean
}
