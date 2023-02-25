import { Col, Modal, Row } from 'antd'
import { Selector } from 'antd-mobile'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ModalType } from '../../../core/types/enums/ModalType'
import { TaskView } from '../../../core/types/Project'
import { modalActions } from '../../../store/features/modals/modal'
import { qrCodeActions } from '../../../store/features/qr-code'
import { QRCreatorModalProps } from './QRCodeModal'

export interface QRCreatorTaskModalProps {
    title?: string
    description?: string
    modalOptions?: TaskView[]
}

export const QRTaskSelectModal: FC<QRCreatorTaskModalProps> = ({
    title,
    description,
    modalOptions,
}) => {
    const dispatch = useDispatch()

    const hideModal = () => dispatch(modalActions.hideModal())
    const [selectedValue, setSelectedValue] = useState<string[] | undefined>(undefined)

    const options = () => {
        if (!modalOptions) return []
        return modalOptions.map((option) => ({
            label: option.name,
            value: option.id,
        }))
    }

    const QRCodeModal: QRCreatorModalProps = {
        title: 'Start Tracking Time',
    }

    useEffect(() => {
        if (!selectedValue) return
        else {
            const selectedTaskId = selectedValue[0]
            dispatch(qrCodeActions.setQRCodeDataTaskId(selectedTaskId))
            hideModal()
            dispatch(
                modalActions.showModal({
                    type: ModalType.QRCodeModal,
                    props: QRCodeModal,
                }),
            )
        }
    }, [selectedValue])

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
                    <Selector
                        multiple={false}
                        columns={2}
                        options={options()}
                        value={selectedValue}
                        onChange={(arr) => setSelectedValue(arr)}
                    />
                </Col>
            </Row>
        </Modal>
    )
}
