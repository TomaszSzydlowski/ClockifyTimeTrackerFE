import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { workspacesClockifySelectors } from '../../store/features/clockify/workspaces/selectors'

export const useClockifyWorkspaceId = () => {
    const workspaces = useSelector(workspacesClockifySelectors.getWorkspaces)

    const [workspaceId, setWorkspaceId] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (workspaces !== undefined) setWorkspaceId(workspaces[0].id)
    }, [workspaces])

    return workspaceId
}
