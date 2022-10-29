import {
    CoffeeOutlined,
    HomeOutlined,
    SearchOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import StringService from '../../../core/services/StringService'

export const FooterMenu: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className="footer_menu">
            <div
                className={StringService.logicConcat('footer_menu__element', {
                    'footer_menu__element--is-active': location.pathname === '/home',
                })}
            >
                <HomeOutlined onClick={() => navigate('/home')} />
                <span className="footer_menu__element-description">Home</span>
            </div>
            <div
                className={StringService.logicConcat('footer_menu__element', {
                    'footer_menu__element--is-active': location.pathname === '/search',
                })}
            >
                <SearchOutlined onClick={() => navigate('/search')} />
                <span className="footer_menu__element-description">Search</span>
            </div>
            <div
                className={StringService.logicConcat('footer_menu__element', {
                    'footer_menu__element--is-active': location.pathname === '/settings',
                })}
            >
                <SettingOutlined onClick={() => navigate('/settings')} />
                <span className="footer_menu__element-description">Settings</span>
            </div>
            <div
                className={StringService.logicConcat('footer_menu__element', {
                    'footer_menu__element--is-active': location.pathname === '/donate',
                })}
            >
                <CoffeeOutlined onClick={() => navigate('/donate')} />
                <span className="footer_menu__element-description">Donate</span>
            </div>
        </div>
    )
}
