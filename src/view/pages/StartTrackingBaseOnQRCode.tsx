﻿import { CheckOutlined } from '@ant-design/icons'
import { AnyAction } from '@reduxjs/toolkit'
import { Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { projectsClockifySelectors } from '../../store/features/clockify/projects/selectors'
import { trackingAsyncActions } from '../../store/features/clockify/tracking/asyncActions'
import { userClockifySelectors } from '../../store/features/clockify/user/selectors'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const StartTrackingBaseOnQRCode: FC = () => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const projectIdFromUrl = searchParams.get('projectId')
    const taskIdFromUrl = searchParams.get('taskId')
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)
    const userId = useSelector(userClockifySelectors.getUserId)
    const projects = useSelector(projectsClockifySelectors.getProjects)
    let intervalId: NodeJS.Timer | null = null
    const [timer, setTimer] = useState<number>(5)

    useEffect(() => {
        if (!userId || !workspaceId || !projects || !projectIdFromUrl || !taskIdFromUrl)
            return
        dispatch(
            trackingAsyncActions.startTracking({
                workspaceId,
                projectId: projectIdFromUrl,
                taskId: taskIdFromUrl,
            }) as unknown as AnyAction,
        )
    }, [workspaceId, userId, projects])

    useEffect(() => {
        intervalId = setInterval(() => setTimer((prevValue) => prevValue - 1), 1000)
        return () => {
            if (intervalId) clearInterval(intervalId)
            setTimer(5)
        }
    }, [])

    useEffect(() => {
        if (timer === 0) navigate('/home')
    }, [timer])

    const handleOnClick = () => {
        navigate('/home')
    }

    return (
        <BaseLayout>
            <div className="start-tracking-base-on-qr-code">
                <div className="start-tracking-base-on-qr-code-icon-container">
                    <div className="start-tracking-base-on-qr-code-icon-container__icon_background">
                        <div className="start-tracking-base-on-qr-code-icon-container__icon_content">
                            <CheckOutlined />
                        </div>
                    </div>
                </div>
                <div className="start-tracking-base-on-qr-code__title">
                    <h2>Success!</h2>
                </div>
                <span className="start-tracking-base-on-qr-code__description">
                    Your time is tracking. You will be redirected to the homepage after{' '}
                    {timer} seconds.
                </span>
                <div className="start-tracking-base-on-qr-code__action">
                    <Button type={'default'} size={'large'} onClick={handleOnClick}>
                        Continue
                    </Button>
                </div>
            </div>
        </BaseLayout>
    )
}
