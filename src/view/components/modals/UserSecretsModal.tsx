import React, {FC} from 'react'
import {Col, Row, Modal, Button} from 'antd'
import {useDispatch} from 'react-redux'
import {modalActions} from '../../../store/features/modals/modal'

export interface SaveModalProps {
    onSave?(): void,
    onDontSave?(): void,
    title?: string,
    description?: string,
}

export const UserSecretsModal: FC<SaveModalProps> = ({
                                                  title, description, onSave, onDontSave
                                              }) => {
    const dispatch = useDispatch()

    const hideModal = () => dispatch(modalActions.hideModal())

    const handleDontSave = () => {
        hideModal()
        if(onDontSave) onDontSave()
    }

    const handleSave = () => {
        hideModal()
        if(onSave) onSave()
    }

    return (
        <Modal
            className="confirm-modal"
            onCancel={hideModal}
            visible
            closable
            centered
            closeIcon={<i className="fas fa-times"/>}
            footer={[
                <Button
                    key="dontSave"
                    danger
                    type="primary"
                    onClick={handleDontSave}>{"DON'T SAVE"}</Button>,
                <Button
                    key="save"
                    color="primary"
                    type="primary"
                    onClick={handleSave}>{'SAVE'}</Button>
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
