import { FC, useEffect } from 'react'

import { TabTitle } from '../../../core/helpers/TabTitle'
import { useLiveTime } from '../../../core/hooks/useLiveTime'

export const TimeTrackingTabTitle: FC = () => {
    const { displayTimeView } = useLiveTime()

    useEffect(() => {
        if (!displayTimeView) {
            TabTitle('Clockify Time Tracker')
            return
        }

        TabTitle(displayTimeView)
    }, [displayTimeView])

    return null
}
