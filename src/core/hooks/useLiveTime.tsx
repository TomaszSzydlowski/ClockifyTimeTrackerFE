import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { trackingClockifySelectors } from '../../store/features/clockify/tracking/selectors'
import TimeService from '../services/TimeService'
import { DisplayTime } from '../types/DisplayTime'

interface TimeInterval {
    start?: Dayjs
    end?: Dayjs
}

export const useLiveTime = () => {
    const tracking = useSelector(trackingClockifySelectors.getTracking)
    const [timeInterval, setTimeInterval] = useState<TimeInterval>({
        start: undefined,
        end: undefined,
    })
    const [displayTime, setDisplayTime] = useState<DisplayTime | undefined>(undefined)
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>(undefined)
    const [displayTimeView, setDisplayTimeView] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!tracking) {
            setTimeInterval({ start: undefined, end: undefined })
            return
        }

        setTimeInterval({
            start: tracking.timeInterval.start,
            end: tracking.timeInterval.end,
        })
    }, [tracking])

    useEffect(() => {
        if (intervalId !== undefined) {
            clearInterval(intervalId)
            setIntervalId(undefined)
        }

        if (!timeInterval.start) {
            setDisplayTime(undefined)
            return
        }
        if (!timeInterval.end) {
            const id = setInterval(() => {
                const diff = dayjs().diff(timeInterval.start, 's')
                const displayTime = TimeService.getDisplayTabTitleTime(diff)
                setDisplayTime(displayTime)
            }, 1000)
            setIntervalId(id)
        }
    }, [timeInterval])

    useEffect(() => {
        const displayTimeView = TimeService.getDisplayCurrentTimeView(displayTime)
        setDisplayTimeView(displayTimeView)
    }, [displayTime])

    return { displayTime, displayTimeView }
}
