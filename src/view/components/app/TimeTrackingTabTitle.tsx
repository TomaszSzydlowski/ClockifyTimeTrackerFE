import dayjs, { Dayjs } from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { TabTitle } from '../../../core/helpers/TabTitle'
import { trackingClockifySelectors } from '../../../store/features/clockify/tracking/selectors'

interface DisplayTime {
    second: number
    minutes: number
    hour: number
}

export const TimeTrackingTabTitle: FC = () => {
    const tracking = useSelector(trackingClockifySelectors.getTracking)
    const [startTime, setStartTime] = useState<Dayjs | undefined>(undefined)
    const [displayTime, setDisplayTime] = useState<DisplayTime | undefined>(undefined)
    const [intervalId, setIntervalId] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (!tracking) {
            setStartTime(undefined)
            return
        }

        const currentStartTime = tracking.timeInterval.start
        setStartTime(currentStartTime)
    }, [tracking])

    useEffect(() => {
        console.log(intervalId, 'id')
        console.log(startTime, 'startTime')
        if (!startTime && intervalId !== undefined) {
            clearInterval(intervalId)
            setIntervalId(undefined)
            TabTitle('Clockify Time Tracker')
            return
        }

        if (!startTime) {
            setDisplayTime(undefined)
            return
        }

        const id = setInterval(() => {
            const diff = dayjs().diff(startTime, 's')
            if (diff === 0) return
            if (diff < 60) {
                setDisplayTime({ second: diff, minutes: 0, hour: 0 })
                return
            }
            if (diff < 3600) {
                setDisplayTime({
                    second: diff % 60,
                    minutes: Math.floor(diff / 60),
                    hour: 0,
                })
                return
            }
            setDisplayTime({
                second: Math.floor(
                    diff -
                        Math.floor(diff - Math.floor(diff / 3600) * 3600) * 60 -
                        Math.floor(diff / 3600) * 3600,
                ),
                minutes: Math.floor(diff - Math.floor(diff / 3600) * 3600),
                hour: Math.floor(diff / 3600),
            })
        }, 1000)
        setIntervalId(id)
    }, [startTime])

    useEffect(() => {
        if (!displayTime) return
        const second = displayTime?.second ?? ''
        const minutes = displayTime.minutes
            ? displayTime.minutes < 10
                ? '0' + displayTime.minutes + ':'
                : displayTime.minutes + ':'
            : ''
        const hour = displayTime.hour
            ? displayTime.hour < 10
                ? '0' + displayTime.hour + ':'
                : displayTime.hour + ':'
            : ''
        const unit = displayTime.hour ? 'h' : displayTime.minutes ? 'min' : 'sec'
        const result = `${hour}${minutes}${second} ${unit}`
        TabTitle(result)
    }, [displayTime])

    return null
}
