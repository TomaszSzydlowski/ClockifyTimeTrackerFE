import { Col, Modal, Row } from 'antd'
import { Selector } from 'antd-mobile'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ModalType } from '../../../core/types/enums/ModalType'
import { ProjectView } from '../../../core/types/Project'
import { modalActions } from '../../../store/features/modals/modal'
import { qrCodeActions } from '../../../store/features/qr-code'
import { QRCreatorTaskModalProps } from './QRTaskSelectModal'

export interface QRCreatorProjectModalProps {
    title: string
    description: string
    modalOptions?: ProjectView[]
}

export const QRProjectSelectModal: FC<QRCreatorProjectModalProps> = ({
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

    const QRTaskSelectModalProps: QRCreatorTaskModalProps = {
        title: 'Select Task',
        description: 'Step 2/2 select task',
        modalOptions: modalOptions?.find(
            (option) => option.id === (selectedValue ? selectedValue[0] : -1),
        )?.tasks,
    }

    useEffect(() => {
        if (!selectedValue) return
        else {
            const selectedProjectId = selectedValue[0]
            dispatch(qrCodeActions.setQRCodeDataProjectId(selectedProjectId))
            hideModal()
            dispatch(
                modalActions.showModal({
                    type: ModalType.QRTaskSelectModal,
                    props: QRTaskSelectModalProps,
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
