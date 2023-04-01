import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Tag } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ProjectTag {
    text: string
    color: string
}

interface TaskCardProps {
    description?: string
    projectTags?: ProjectTag[]
    onStartClick: () => void
    onPauseClick: () => void
    taskUrl: string
    isTracking: boolean
}

export const TaskCard: FC<TaskCardProps> = ({
    description,
    projectTags,
    onPauseClick,
    onStartClick,
    taskUrl,
    isTracking,
}) => {
    const navigate = useNavigate()

    return (
        <div className="task_box" onClick={() => navigate(taskUrl)}>
            <Card>
                <Row>
                    <Col span={21} className="task_box_description">
                        {projectTags !== undefined && (
                            <div className="task_box_description__tags">
                                {projectTags.map(({ text, color }, index) => (
                                    <Tag key={index} color={color}>
                                        {text}
                                    </Tag>
                                ))}
                            </div>
                        )}
                        <div className="task_box_description__task">{description}</div>
                    </Col>
                    <Col span={3} className="task_box__action">
                        <Button
                            type={'text'}
                            icon={
                                isTracking ? (
                                    <PauseCircleOutlined />
                                ) : (
                                    <PlayCircleOutlined />
                                )
                            }
                            className="task_box__action--button"
                            onClick={(e) => {
                                e.stopPropagation()
                                isTracking ? onPauseClick() : onStartClick()
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
