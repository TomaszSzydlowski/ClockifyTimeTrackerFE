import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React, { FC } from 'react'

export const TrackerPlayer: FC = () => {
    const onPauseClick = () => {}
    const onStartClick = () => {}
    const isTracking = true
    const color = 'yellow'
    return (
        <div className="tracker_player">
            <Row className="tracker_player_box" justify="center">
                <Col span={20}>
                    <div className="tracker_player_box__project-color">
                        <div
                            className="tracker_player_box__project-color--content"
                            style={{ backgroundColor: color }}
                        />
                    </div>
                    <div className="tracker_player_box_information">
                        <div className="tracker_player_box_information__task_name">
                            #15001 PT // Technicians: Qualifications - - possibility of
                            adding
                        </div>
                        <Row className="tracker_player_box_information_details">
                            <Col
                                span={16}
                                className="tracker_player_box_information_details__author"
                            >
                                tomasz szydlowski
                            </Col>
                            <Col
                                span={8}
                                className="tracker_player_box_information_details__timer"
                            >
                                01:02:33
                            </Col>
                        </Row>
                    </div>
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
        </div>
    )
}
