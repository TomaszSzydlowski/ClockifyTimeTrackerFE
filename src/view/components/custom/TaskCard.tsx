import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Tag } from 'antd'
import React, { FC } from 'react'

export interface ProjectTag {
    text: string
    color: string
}

interface TaskCardProps {
    description?: string
    projectTags?: ProjectTag[]
    onStartClick: () => void
    onPauseClick: () => void
    isTracking: boolean
}

export const TaskCard: FC<TaskCardProps> = ({
    description,
    projectTags,
    onPauseClick,
    onStartClick,
    isTracking,
}) => {
    return (
        <div className="task_box">
            <Card>
                <Row>
                    <Col span={20} className="task_box_description">
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
                    <Col span={4} className="task_box__action">
                        <Button
                            shape="circle"
                            icon={isTracking ? <PauseOutlined /> : <CaretRightOutlined />}
                            className="task_box__action--button"
                            onClick={() => {
                                isTracking ? onPauseClick() : onStartClick()
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
