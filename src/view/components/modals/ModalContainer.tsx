import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { ModalType } from '../../../core/types/enums/ModalType'
import { modalSelectors } from '../../../store/features/modals/modal/selectors'
import { ConfirmModal } from './ConfirmModal'
import { UserSecretsModal } from './UserSecretsModal'
import { YoursProjectsModal } from './YoursProjectsModal'

const modalsTypes = {
    [ModalType.ConfirmModal]: ConfirmModal,
    [ModalType.UserSecretsModal]: UserSecretsModal,
    [ModalType.YoursProjectsModal]: YoursProjectsModal,
}

export const ModalContainer: FC = () => {
    const modals = useSelector(modalSelectors.getModals)

    return (
        <section id="modal-body-container">
            {modals.map((x, index) => {
                const ModalBody = modalsTypes[x.type]
                return <ModalBody key={index} {...(x.props as any)} />
            })}
        </section>
    )
}
