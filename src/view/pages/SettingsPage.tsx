import { Button, Card, Col, Row } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { AZURE_DEV_OPS_TOKEN, CLOCKIFY_KEY } from '../../core/consts/consts'
import { ModalType } from '../../core/types/enums/ModalType'
import { modalActions } from '../../store/features/modals/modal'
import { BaseLayout } from '../components/layouts/BaseLayout'
import { BaseModalProps } from '../components/modals/UserSecretsModal'

export const SettingsPage: FC = () => {
    const dispatch = useDispatch()

    const YoursProjectsModalProps: BaseModalProps = {
        title: 'Please select your favourite projects',
        description: 'To avoid to many request, please select project in which you work',
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
