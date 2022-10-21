import { Modal, ModalStoreModel } from './index'

export const reducers = {
    showModal<T>(state: ModalStoreModel, { payload }: { payload: Modal<T> }): void {
        state.modals.push(payload)
    },
    hideModal(state: ModalStoreModel): void {
        state.modals.pop()
    },
}
