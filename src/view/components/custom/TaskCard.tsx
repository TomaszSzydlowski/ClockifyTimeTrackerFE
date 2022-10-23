import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Tag } from 'antd'
import React, { FC, useState } from 'react'

export interface projectTag {
    text: string
    color: string
}

interface TaskCardProps {
    description?: string
    projectTags: projectTag[]
    onStartClick: () => void
    onPauseClick: () => void
}

export const TaskCard: FC<TaskCardProps> = ({
    description,
    projectTags,
    onPauseClick,
    onStartClick,
}) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className="task_box">
            <Card>
                <Row>
                    <Col span={20} className="task_box_description">
                        <div className="task_box_description__task">{description}</div>
                        <div className="task_box_description__tags">
                            {projectTags.map(({ text, color }, index) => (
                                <Tag key={index} color={color}>
                                    {text}
                                </Tag>
                            ))}
                        </div>
                    </Col>
                    <Col span={4} className="task_box__action">
                        <Button
                            shape="circle"
                            icon={isActive ? <PauseOutlined /> : <CaretRightOutlined />}
                            className="task_box__action--button"
                            onClick={() => {
                                isActive ? onPauseClick() : onStartClick()
                                setIsActive(!isActive)
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
