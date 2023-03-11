import { Button, Col, Modal, Row } from 'antd'
import { Selector } from 'antd-mobile'
import ls from 'localstorage-slim'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { YOURS_PROJECTS } from '../../../core/consts/consts'
import { projectsClockifySelectors } from '../../../store/features/clockify/projects/selectors'
import { yoursProjectsActions } from '../../../store/features/clockify/yours-projects'
import { yoursProjectsSelectors } from '../../../store/features/clockify/yours-projects/selectors'
import { modalActions } from '../../../store/features/modals/modal'

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
}) => {
    const dispatch = useDispatch()
    const projects = useSelector(projectsClockifySelectors.getProjects)
    const yoursProjects = useSelector(yoursProjectsSelectors.getYoursProjects)

    const hideModal = () => dispatch(modalActions.hideModal())
    const [yoursProjectsIds, setYoursProjectsIds] = useState<string[] | undefined>(
        undefined,
    )

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
    useEffect(() => {
        if (!yoursProjects) return
        setYoursProjectsIds(yoursProjects)
    }, [yoursProjects])

    return (
        <Modal
            className="confirm-modal"
            onCancel={hideModal}
            open
            closable
            centered
            closeIcon={<i className="fas fa-times" />}
            footer={[
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
                        value={yoursProjectsIds || []}
                        onChange={(arr) => setYoursProjectsIds(arr)}
                    />
                </Col>
            </Row>
        </Modal>
    )
}
