﻿import { DisplayTime } from '../types/DisplayTime'

export default class TimeService {
    static getDisplayTabTitleTime = (seconds: number): DisplayTime | undefined => {
        if (seconds === 0) return
        if (seconds < 60) {
            return { seconds: seconds, minutes: 0, hour: 0 }
        }
        if (seconds < 3600) {
            return {
                seconds: seconds % 60,
                minutes: Math.floor(seconds / 60),
                hour: 0,
            }
        }
        return {
            seconds: Math.floor(
                seconds -
                    Math.floor((seconds - Math.floor(seconds / 3600) * 3600) / 60) * 60 -
                    Math.floor(seconds / 3600) * 3600,
            ),
            minutes: Math.floor((seconds - Math.floor(seconds / 3600) * 3600) / 60),
            hour: Math.floor(seconds / 3600),
        }
    }

    static getDisplayCurrentTimeView = (
        displayTime?: DisplayTime,
    ): string | undefined => {
        if (!displayTime) return undefined

        const second = displayTime.seconds
            ? displayTime.seconds < 10 && displayTime.minutes !== 0
                ? '0' + displayTime.seconds
                : displayTime.seconds
            : '00'
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
        return `${hour}${minutes}${second} ${unit}`
    }
}
