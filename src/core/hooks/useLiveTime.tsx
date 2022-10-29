import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { trackingClockifySelectors } from '../../store/features/clockify/tracking/selectors'
import TimeService from '../services/TimeService'
import { DisplayTime } from '../types/DisplayTime'

export const useLiveTime = () => {
    const tracking = useSelector(trackingClockifySelectors.getTracking)
    const [startTime, setStartTime] = useState<Dayjs | undefined>(undefined)
    const [displayTime, setDisplayTime] = useState<DisplayTime | undefined>(undefined)
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>(undefined)
    const [displayTimeView, setDisplayTimeView] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!tracking) {
            setStartTime(undefined)
            return
        }

        setStartTime(tracking.timeInterval.start)
    }, [tracking])

    useEffect(() => {
        if (intervalId !== undefined) {
            clearInterval(intervalId)
            setIntervalId(undefined)
        }

        if (!startTime) {
            setDisplayTime(undefined)
            return
        }

        const id = setInterval(() => {
            const diff = dayjs().diff(startTime, 's')
            const displayTime = TimeService.getDisplayTabTitleTime(diff)
            setDisplayTime(displayTime)
        }, 1000)
        setIntervalId(id)
    }, [startTime])

    useEffect(() => {
        const displayTimeView = TimeService.getDisplayCurrentTimeView(displayTime)
        setDisplayTimeView(displayTimeView)
    }, [displayTime])

    return { displayTime, displayTimeView }
}
