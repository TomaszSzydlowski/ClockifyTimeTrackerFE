import React, {FC} from 'react'
import {Col, Row, Modal, Button} from 'antd'
import {useDispatch} from 'react-redux'
import {modalActions} from '../../../store/features/modals/modal'

export interface ConfirmModalProps{
    onStay?(): void,
    onLeave?(): void,
    title?: string,
    description?: string,
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
    title, description, onStay, onLeave
}) => {
    const dispatch = useDispatch()

    const handleLeave = () => {
        dispatch(modalActions.hideModal())
        if(onLeave) onLeave()
    }

    const handleStay = () => {
        dispatch(modalActions.hideModal())
        if(onStay) onStay()
    }

    return (
        <Modal
            className="confirm-modal"
            onCancel={handleStay}
            visible
            closable
            centered
            closeIcon={<i className="fas fa-times"/>}
            footer={[
                <Button
                    key="stay"
                    onClick={handleStay}>{'STAY'}</Button>,
                <Button
                    key="leave"
                    danger
                    type="primary"
                    onClick={handleLeave}>{'LEAVE'}</Button>
            ]}>
            <Row>
                <Col xs={24}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </Col>
            </Row>
        </Modal>
    )
}
