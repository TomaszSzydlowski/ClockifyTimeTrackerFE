import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'

export const WelcomeHeader: FC = () => {
    const userName = useSelector(userClockifySelectors.getUserName)

    const getUserName = (userName?: string): string => {
        if (!userName) return ''
        const firstName = userName.split(' ')[0]
        return firstName
    }

    return (
        <div className="home_page_header">
            <div className="home_page_header__title">Hello {getUserName(userName)}!</div>
        </div>
    )
}
