import React, {FC, useState} from 'react'
import {Col, Row, Modal, Button, Input} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {modalActions} from '../../../store/features/modals/modal'
import {userSecretsActions} from "../../../store/features/user-secrets"

export interface BaseModalProps {
    onSave?(): void,

    onDontSave?(): void,

    title?: string,
    description?: string,
}

export const UserSecretsModal: FC<BaseModalProps> = ({
                                                         title, description, onSave, onDontSave
                                                     }) => {
    const dispatch = useDispatch()
    const hideModal = () => dispatch(modalActions.hideModal())
    
    const [azureDevOpsToken, setAzureDevOpsToken] = useState<string | undefined>(undefined);
    const [clockifyApiKey, setClockifyApiKey] = useState<string | undefined>(undefined);

    const handleDontSave = () => {
        hideModal()
        if (onDontSave) onDontSave()
    }

    const handleSave = () => {
        if (clockifyApiKey !== undefined) dispatch(userSecretsActions.setClockifyApiKey({clockifyApiKey}))
        if (azureDevOpsToken !== undefined) dispatch(userSecretsActions.setAzureDevOpsToken({azureDevOpsToken}))
        hideModal()
        if (onSave) onSave()
    }

    return (
        <Modal
            className="confirm-modal"
            onCancel={hideModal}
            open
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
                    <Input.Password
                        placeholder="Clockify API KEY" value={clockifyApiKey}
                        onChange={(e) => setClockifyApiKey(e.target.value)}/>
                    <Input.Password
                        placeholder="Azure Dev Ops Token" value={azureDevOpsToken}
                        onChange={(e) => setAzureDevOpsToken(e.target.value)}/>
                </Col>
            </Row>
        </Modal>
    )
}
