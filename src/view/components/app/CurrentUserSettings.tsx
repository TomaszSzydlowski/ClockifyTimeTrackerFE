import {FC, useEffect} from "react"
import {useDispatch} from "react-redux";
import {modalActions} from "../../../store/features/modals/modal";
import {ModalType} from "../../../core/types/enums/ModalType";

export const CurrentUserSettings: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(modalActions.showModal({
            type: ModalType.UserSecretsModal,
            props: {}
        }))
    }, []);
    
    return null
}