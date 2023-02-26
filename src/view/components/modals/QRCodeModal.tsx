import { Col, Modal, Row } from 'antd'
import { QRCode } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { modalActions } from '../../../store/features/modals/modal'
import { qrCodeActions } from '../../../store/features/qr-code'
import { qrCodeSelectors } from '../../../store/features/qr-code/selectors'

export interface QRCreatorModalProps {
    title: string
    description?: string
}

export const QRCodeModal: FC<QRCreatorModalProps> = ({ title, description }) => {
    const dispatch = useDispatch()
    const projectId = useSelector(qrCodeSelectors.getQRCodeProjectId)
    const taskId = useSelector(qrCodeSelectors.getQRCodeTaskId)
    const baseUrl = `${window.location.protocol}//${window.location.hostname}`
    const hideModal = () => dispatch(modalActions.hideModal())
    const [url, setUrl] = useState<string | undefined>(undefined)
    useEffect(() => {
        return () => {
            dispatch(qrCodeActions.clear())
        }
    }, [])

    useEffect(() => {
        if (!projectId || !taskId) return
        const newUrl = `${baseUrl}/#/startTrackingBaseOnQRCode?projectId=${projectId}&taskId=${taskId}`
        setUrl(newUrl)
    }, [projectId, taskId])

    return (
        <Modal
            className="confirm-modal"
            onCancel={hideModal}
            open
            closable
            centered
            closeIcon={<i className="fas fa-times" />}
            footer={<></>}
        >
            <Row>
                <Col xs={24}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    {url && (
                        <QRCode
                            style={{ margin: 'auto' }}
                            size={240}
                            errorLevel="H"
                            value={url}
                            icon="https://imgtr.ee/images/2023/02/25/RW1BU.png"
                        />
                    )}
                </Col>
            </Row>
        </Modal>
    )
}
