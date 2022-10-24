import { Button, Col, Input, Modal, Row } from 'antd'
import { Selector } from 'antd-mobile'
import { SelectorOption } from 'antd-mobile/es/components/selector/selector'
import ls from 'localstorage-slim'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CLOCKIFY_KEY, YOURS_PROJECTS } from '../../../core/consts/consts'
import { projectsClockifySelectors } from '../../../store/features/clockify/projects/selectors'
import { yoursProjectsActions } from '../../../store/features/clockify/yours-projects'
import { modalActions } from '../../../store/features/modals/modal'
import { userSecretsActions } from '../../../store/features/user-secrets'

export interface BaseModalProps {
    onSave?(): void

    onDontSave?(): void

    title?: string
    description?: string
}

export const YoursProjectsModal: FC<BaseModalProps> = ({
    title,
    description,
    onSave,
    onDontSave,
}) => {
    const dispatch = useDispatch()
    const projects = useSelector(projectsClockifySelectors.getprojects)
    const hideModal = () => dispatch(modalActions.hideModal())
    const [yoursProjectsIds, setYoursProjectsIds] = useState<string[] | undefined>(
        undefined,
    )

    const handleDontSave = () => {
        hideModal()
        if (onDontSave) onDontSave()
    }

    const handleSave = () => {
        if (yoursProjectsIds !== undefined) {
            ls.set(YOURS_PROJECTS, yoursProjectsIds, { encrypt: true })
            dispatch(yoursProjectsActions.setYoursProjects(yoursProjectsIds))
        }
        hideModal()
        if (onSave) onSave()
    }

    const options = () => {
        if (!projects) return []
        return projects.map((project) => ({
            label: project.name,
            value: project.id,
        }))
    }
    return (
        <Modal
            className="confirm-modal"
            onCancel={hideModal}
            open
            closable
            centered
            closeIcon={<i className="fas fa-times" />}
            footer={[
                <Button key="dontSave" danger type="primary" onClick={handleDontSave}>
                    {"DON'T SAVE"}
                </Button>,
                <Button key="save" color="primary" type="primary" onClick={handleSave}>
                    {'SAVE'}
                </Button>,
            ]}
        >
            <Row>
                <Col xs={24}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <Selector
                        columns={2}
                        options={options()}
                        multiple={true}
                        onChange={(arr) => setYoursProjectsIds(arr)}
                    />
                </Col>
            </Row>
        </Modal>
    )
}
