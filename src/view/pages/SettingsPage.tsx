import { Button, Card } from 'antd'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AZURE_DEV_OPS_TOKEN, CLOCKIFY_KEY } from '../../core/consts/consts'
import { ModalType } from '../../core/types/enums/ModalType'
import { projectsClockifySelectors } from '../../store/features/clockify/projects/selectors'
import { modalActions } from '../../store/features/modals/modal'
import { qrCodeActions } from '../../store/features/qr-code'
import { BaseLayout } from '../components/layouts/BaseLayout'
import { QRCreatorProjectModalProps } from '../components/modals/QRProjectSelectModal'
import { BaseModalProps } from '../components/modals/UserSecretsModal'

export const SettingsPage: FC = () => {
    const dispatch = useDispatch()
    const projects = useSelector(projectsClockifySelectors.getProjects)

    const YoursProjectsModalProps: BaseModalProps = {
        title: 'Projects',
        description: 'Please select your work projects',
    }

    const QRProjectSelectModalProps: QRCreatorProjectModalProps = {
        title: 'Select Project',
        description: 'Step 1/2 select project',
        modalOptions: projects,
    }

    const clearData = () => {
        localStorage.removeItem(CLOCKIFY_KEY)
        localStorage.removeItem(AZURE_DEV_OPS_TOKEN)
        window.location.reload()
    }

    const selectProject = () => {
        dispatch(
            modalActions.showModal({
                type: ModalType.YoursProjectsModal,
                props: YoursProjectsModalProps,
            }),
        )
    }

    const createQRCode = () => {
        dispatch(qrCodeActions.clear())
        dispatch(
            modalActions.showModal({
                type: ModalType.QRProjectSelectModal,
                props: QRProjectSelectModalProps,
            }),
        )
    }

    return (
        <BaseLayout>
            <div className="settings_page">
                <div className="settings_page__box">
                    <h2>Projects</h2>
                    <Card>
                        <div className="settings_page__description">
                            Select the projects you want to be displayed in the
                            application
                        </div>
                        <div className="settings_page__action">
                            <Button
                                type={'primary'}
                                onClick={selectProject}
                                size={'small'}
                            >
                                Select Projects
                            </Button>
                        </div>
                    </Card>
                </div>
                <div className="settings_page__box">
                    <h2>QR Code</h2>
                    <Card>
                        <div className="settings_page__description">
                            Generate the QR code of the task. Once scanned, it will
                            automatically start tracing time for this task
                        </div>
                        <div className="settings_page__action">
                            <Button
                                type={'primary'}
                                onClick={createQRCode}
                                size={'small'}
                            >
                                Create
                            </Button>
                        </div>
                    </Card>
                </div>
                <div className="settings_page__box">
                    <h2>Danger Zone</h2>
                    <Card className="settings_page__card--danger">
                        <div className="settings_page__description">
                            Clear tokens for Azure Dev Ops and Clockify
                        </div>
                        <div className="settings_page__action">
                            <Button
                                type={'primary'}
                                danger
                                onClick={clearData}
                                size={'small'}
                            >
                                Clear data
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </BaseLayout>
    )
}
