import { StoreModel } from '../../../index'
import { Modal } from './index'

export const modalSelectors = {
    getModals: (state: StoreModel): Modal<unknown>[] => state.modal.modals,
}
