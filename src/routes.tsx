import { FC } from 'react'

import { HomePage } from './view/pages/HomePage'
import { PageNotFound } from './view/pages/PageNotFound'
import { SearchPage } from './view/pages/SearchPage'
import { SettingsPage } from './view/pages/SettingsPage'
import { StartTrackingBaseOnQRCode } from './view/pages/StartTrackingBaseOnQRCode'
import { StatisticsPage } from './view/pages/StatisticsPage'
import { TaskPage } from './view/pages/TaskPage'

interface ConfigRoute {
    path: string
    component: FC
    routes?: ConfigRoute[]
    allowUserWithNoAccess: boolean
}

interface ConfigRedirect {
    redirect: string
    path: string
}

export const AppRedirect: ConfigRedirect[] = [
    {
        path: '/',
        redirect: 'home',
    },
]

export const AppRoutes: ConfigRoute[] = [
    {
        path: '/home',
        component: HomePage,
        allowUserWithNoAccess: false,
    },
    {
        path: '/search',
        component: SearchPage,
        allowUserWithNoAccess: false,
    },
    {
        path: '/settings',
        component: SettingsPage,
        allowUserWithNoAccess: false,
    },
    {
        path: '/statistics',
        component: StatisticsPage,
        allowUserWithNoAccess: false,
    },
    {
        path: '/task',
        component: TaskPage,
        allowUserWithNoAccess: false,
    },
    {
        path: '/startTrackingBaseOnQRCode',
        component: StartTrackingBaseOnQRCode,
        allowUserWithNoAccess: false,
    },
    {
        path: 'not-found',
        component: PageNotFound,
        allowUserWithNoAccess: true,
    },
    {
        path: '*',
        component: PageNotFound,
        allowUserWithNoAccess: true,
    },
]
