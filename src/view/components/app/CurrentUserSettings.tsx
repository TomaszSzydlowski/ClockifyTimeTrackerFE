﻿import {FC, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {modalActions} from "../../../store/features/modals/modal"
import {ModalType} from "../../../core/types/enums/ModalType"
import ls from 'localstorage-slim'
import {BaseModalProps} from "../modals/UserSecretsModal"
import {userSecretsSelectors} from "../../../store/features/user-secrets/selectors"
import {userSecretsActions} from "../../../store/features/user-secrets";
import {AZURE_DEV_OPS_TOKEN, CLOCKIFY_KEY} from "../../../core/consts/consts";

export const CurrentUserSettings: FC = () => {
    const [isFirstRun, setIsFirstRun] = useState<boolean>(true)
    const dispatch = useDispatch()
    const azureDevOpsToken = useSelector(userSecretsSelectors.getUserSecretsAzureDevOpsToken)
    const clockifyApiKey = useSelector(userSecretsSelectors.getUserSecretsClockifyApiKey)

    const getClockifyKey = (): string | null => ls.get(CLOCKIFY_KEY, {decrypt: true})
    const getAzureDevOpsToken = (): string | null => ls.get(AZURE_DEV_OPS_TOKEN, {decrypt: true})
    const setClockifyKeyInLocalStorage = (value: string) => ls.set(CLOCKIFY_KEY, value, {encrypt: true})
    const setAzureDevOpsTokenInLocalStorage = (value: string) => ls.set(AZURE_DEV_OPS_TOKEN, value, {encrypt: true})

    const handleSave = () => dispatch(modalActions.hideModal())
    const handleDontSave = () => dispatch(modalActions.hideModal())

    const UserSecretsModalProps: BaseModalProps = {
        title: "Please provide keys",
        description: "Keys will be store in your browser as encrypt values",
        onSave: handleSave,
        onDontSave: handleDontSave
    }

    const shouldDisplayModal = () => isFirstRun && !getAzureDevOpsToken() && !getClockifyKey()

    useEffect(() => {
        const clockifyApiKeyFromLocalStorage = getClockifyKey()
        const azureDevOpsTokenFromLocalStorage = getAzureDevOpsToken()
        if (clockifyApiKeyFromLocalStorage !== null) dispatch(userSecretsActions.setClockifyApiKey({clockifyApiKey: clockifyApiKeyFromLocalStorage}))
        if (azureDevOpsTokenFromLocalStorage !== null) dispatch(userSecretsActions.setAzureDevOpsToken({azureDevOpsToken: azureDevOpsTokenFromLocalStorage}))
    }, [])
    
    useEffect(() => {
        if (shouldDisplayModal()) {
            dispatch(modalActions.showModal({
                type: ModalType.UserSecretsModal,
                props: UserSecretsModalProps
            }))
        }
        setIsFirstRun(false)
    }, [isFirstRun]);
    
    useEffect(() => {
        if (clockifyApiKey !== undefined) setClockifyKeyInLocalStorage(clockifyApiKey)
        if (azureDevOpsToken !== undefined) setAzureDevOpsTokenInLocalStorage(azureDevOpsToken)
    }, [azureDevOpsToken, clockifyApiKey])

    return null
}