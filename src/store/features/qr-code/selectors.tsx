import { StoreModel } from '../../index'

export const qrCodeSelectors = {
    getQRCodeProjectId: (state: StoreModel): string | undefined =>
        state.QRCodeData.projectId,
    getQRCodeTaskId: (state: StoreModel): string | undefined => state.QRCodeData.taskId,
}
