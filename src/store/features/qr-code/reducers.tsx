import { qrCodeStoreModel } from './index'

export const reducers = {
    clear(state: qrCodeStoreModel): void {
        state = { projectId: undefined, taskId: undefined }
    },
    setQRCodeDataProjectId(
        state: qrCodeStoreModel,
        { payload }: { payload: string },
    ): void {
        state.projectId = payload
    },
    setQRCodeDataTaskId(
        state: qrCodeStoreModel,
        {
            payload,
        }: {
            payload: string
        },
    ): void {
        state.taskId = payload
    },
}
