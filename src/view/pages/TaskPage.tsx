import {
    DownOutlined,
    FieldTimeOutlined,
    LeftOutlined,
    MoreOutlined,
    RetweetOutlined,
    ShareAltOutlined,
    SmileOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, MenuProps, message, Progress, QRCode, Space } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { TaskInfo } from '../../core/types/TaskInfo'
import { projectsClockifySelectors } from '../../store/features/clockify/projects/selectors'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const TaskPage: FC = () => {
    const [searchParams] = useSearchParams()
    const projects = useSelector(projectsClockifySelectors.getProjects)
    const projectIdFromUrl = searchParams.get('projectId')
    const taskIdFromUrl = searchParams.get('taskId')
    const baseUrl = `${window.location.protocol}//${window.location.hostname}`

    const [url, setUrl] = useState('')
    const [task, setTask] = useState<TaskInfo>()
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (!projectIdFromUrl || !taskIdFromUrl) return
        const newUrl = `${baseUrl}/#/startTrackingBaseOnQRCode?projectId=${projectIdFromUrl}&taskId=${taskIdFromUrl}`
        setUrl(newUrl)
    }, [projectIdFromUrl, taskIdFromUrl])

    useEffect(() => {
        if (!projects || projects.length === 0) return
        const project = projects.find((project) => project.id === projectIdFromUrl)
        const task = project?.tasks.find((task) => task.id === taskIdFromUrl)
        const newPlayerInfo: TaskInfo = {
            projectId: project?.id,
            taskId: task?.id,
            projectName: project?.name,
            projectColor: project?.color,
            authorName: undefined,
            taskName: task?.name,
        }
        setTask(newPlayerInfo)
    }, [projects])

    const navigate = useNavigate()

    const handleBackButtonClick = () => {
        navigate(-1)
    }

    const handleShareClick = () => {
        const input = document.createElement('input')
        input.setAttribute('value', url)
        document.body.appendChild(input)

        // Select the text inside the input element
        input.select()

        // Copy the text to the clipboard
        document.execCommand('copy')

        // Remove the temporary input element
        document.body.removeChild(input)

        messageApi.open({
            type: 'success',
            content: 'The link has been copied',
        })
    }

    return (
        <BaseLayout hideFooter={true}>
            {contextHolder}
            <div className="task-page">
                <div className="task-page-header">
                    <div className="task-page-header__back">
                        <LeftOutlined onClick={handleBackButtonClick} />
                    </div>
                    <div className="task-page-header__title">
                        <span>{task?.projectName}</span>
                    </div>
                </div>
                <div className="task-page__qr-code">
                    <QRCode
                        style={{ margin: 'auto' }}
                        size={260}
                        errorLevel="H"
                        value={url}
                    />
                </div>
                <div className="task-page-task-card">
                    <div
                        className="task-page-task-card__project-line"
                        style={{ backgroundColor: task?.projectColor }}
                    />
                    <div className="task-page-task-card-content">
                        <div className="task-page-task-card-content__title">
                            <span> {task?.taskName}</span>
                        </div>
                        <div className="task-page-task-card-content-others">
                            <div className="task-page-task-card-content-others__description">
                                <span>{task?.authorName ?? 'Unknown task owner'}</span>
                            </div>
                            <div className="task-page-task-card-content-others__actions">
                                <Button
                                    type="ghost"
                                    onClick={handleShareClick}
                                    icon={<ShareAltOutlined />}
                                />
                                <Button type="ghost" icon={<FieldTimeOutlined />} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="task-page-progress">
                    <div className="task-page-progress-content">
                        <div className="task-page-progress-content__label">
                            Time of tracking
                        </div>
                        <div className="task-page-progress-content__switch">
                            <RetweetOutlined />
                        </div>
                        <div className="task-page-progress-content__time">
                            4:40 / 7:30 h
                        </div>
                    </div>
                    <div className="task-page-progress__line-bar">
                        {' '}
                        <Progress percent={50} status="active" />
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}
