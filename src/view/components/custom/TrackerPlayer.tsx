﻿import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { AnyAction } from '@reduxjs/toolkit'
import { Button, Col, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLiveTime } from '../../../core/hooks/useLiveTime'
import { TaskInfo } from '../../../core/types/TaskInfo'
import { lastTimeEntriesSelectors } from '../../../store/features/clockify/last-time-entries/selectors'
import { projectsClockifySelectors } from '../../../store/features/clockify/projects/selectors'
import { trackingAsyncActions } from '../../../store/features/clockify/tracking/asyncActions'
import { trackingClockifySelectors } from '../../../store/features/clockify/tracking/selectors'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'

export const TrackerPlayer: FC = () => {
    const dispatch = useDispatch()

    const tracking = useSelector(trackingClockifySelectors.getTracking)
    const lastTimeEntries = useSelector(lastTimeEntriesSelectors.getLastTimeEntries)
    const projects = useSelector(projectsClockifySelectors.getProjects)
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)

    const { displayTimeView } = useLiveTime()
    const [playerInfo, setPlayerInfo] = useState<TaskInfo | undefined>(undefined)

    const handleStartClick = async (taskId?: string, projectId?: string) => {
        if (!projectId) return console.error('missing projectId')
        if (!workspaceId) return console.error('missing workspaceId')
        if (!userId) return console.error('missing userId')
        dispatch(
            trackingAsyncActions.startTracking({
                workspaceId,
                projectId,
                taskId,
            }) as unknown as AnyAction,
        )
    }
    const handlePauseClick = async () => {
        if (!workspaceId) return console.error('missing workspaceId')
        if (!userId) return console.error('missing userId')
        dispatch(
            trackingAsyncActions.stopTracking({
                workspaceId,
                userId,
            }) as unknown as AnyAction,
        )
    }

    useEffect(() => {
        if (!projects || projects.length === 0) return
        if (!tracking && lastTimeEntries !== undefined && lastTimeEntries.length > 0) {
            const lastTimeEntry = lastTimeEntries[0]
            const project = projects.find(
                (project) => project.id === lastTimeEntry.projectId,
            )
            const task = project?.tasks.find((task) => task.id === lastTimeEntry.taskId)
            const newPlayerInfo: TaskInfo = {
                projectId: project?.id,
                taskId: task?.id,
                projectName: project?.name,
                projectColor: project?.color,
                authorName: undefined,
                taskName: task?.name,
            }
            setPlayerInfo(newPlayerInfo)
            return
        }
        if (tracking !== undefined) {
            const project = projects.find((project) => project.id === tracking.projectId)
            const task = project?.tasks.find((task) => task.id === tracking.taskId)
            const newPlayerInfo: TaskInfo = {
                projectId: project?.id,
                taskId: task?.id,
                projectName: project?.name,
                projectColor: project?.color,
                authorName: undefined,
                taskName: task?.name,
            }
            setPlayerInfo(newPlayerInfo)
            return
        }
    }, [tracking, lastTimeEntries, projects])

    return (
        <div className="tracker_player">
            <Row className="tracker_player_box" justify="center">
                <Col span={20}>
                    <div className="tracker_player_box__project-color">
                        <div
                            className="tracker_player_box__project-color--content"
                            style={{ backgroundColor: playerInfo?.projectColor }}
                        />
                    </div>
                    <div className="tracker_player_box_information">
                        <div className="tracker_player_box_information__task_name">
                            <span>{playerInfo?.taskName || 'Unknown task name'}</span>
                        </div>
                        <Row className="tracker_player_box_information_details">
                            <Col
                                span={16}
                                className="tracker_player_box_information_details__author"
                            >
                                {playerInfo?.authorName || 'Unknown task owner'}
                            </Col>
                            <Col
                                span={8}
                                className="tracker_player_box_information_details__timer"
                            >
                                {displayTimeView || ''}
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={4} className="task_box__action">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={
                            tracking && !tracking.timeInterval.end ? (
                                <PauseOutlined />
                            ) : (
                                <CaretRightOutlined />
                            )
                        }
                        className="task_box__action--button"
                        onClick={() => {
                            tracking && !tracking.timeInterval.end
                                ? handlePauseClick()
                                : handleStartClick(
                                      playerInfo?.taskId,
                                      playerInfo?.projectId,
                                  )
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}
