import React, {FC} from 'react'
import {Button, Result} from "antd"
import {useNavigate} from "react-router-dom"

export const PageNotFound: FC = () => {
    const navigate = useNavigate()
    
    const backToMainPage = () => {
        navigate('/')
    }
    
    return (
        <Result
            status="404"
            title="404"
            subTitle={'Sorry, the page you visited does not exist.'}
            extra={<Button
                type="primary"
                onClick={backToMainPage}>{'Back Home'}</Button>}/>
    )
}

