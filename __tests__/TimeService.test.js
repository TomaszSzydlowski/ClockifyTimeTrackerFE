import { describe, expect, test } from 'vitest'

import TimeService from '../src/core/services/TimeService'

describe('should correct calculate time', () => {
    test('When is less then 60 seconds', () => {
        const result = TimeService.getDisplayTabTitleTime(2)
        expect(result.seconds).toBe(2)
        expect(result.minutes).toBe(0)
        expect(result.hour).toBe(0)
    })
    test('When is 60 seconds', () => {
        const result = TimeService.getDisplayTabTitleTime(60)
        expect(result.seconds).toBe(0)
        expect(result.minutes).toBe(1)
        expect(result.hour).toBe(0)
    })

    test('When is less then 60 minutes', () => {
        const result = TimeService.getDisplayTabTitleTime(3599)
        expect(result.seconds).toBe(59)
        expect(result.minutes).toBe(59)
        expect(result.hour).toBe(0)
    })
    test('When is 60 minutes', () => {
        const result = TimeService.getDisplayTabTitleTime(3600)
        expect(result.seconds).toBe(0)
        expect(result.minutes).toBe(0)
        expect(result.hour).toBe(1)
    })

    test('When is less then 60 hours', () => {
        const result = TimeService.getDisplayTabTitleTime(215999)
        expect(result.seconds).toBe(59)
        expect(result.minutes).toBe(59)
        expect(result.hour).toBe(59)
    })
    test('When is 60 hours', () => {
        const result = TimeService.getDisplayTabTitleTime(216000)
        expect(result.seconds).toBe(0)
        expect(result.minutes).toBe(0)
        expect(result.hour).toBe(60)
    })
})
