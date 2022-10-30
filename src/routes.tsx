import { FC } from 'react'

import { DonatePage } from './view/pages/DonatePage'
import { HomePage } from './view/pages/HomePage'
import { PageNotFound } from './view/pages/PageNotFound'
import { ProjectPage } from './view/pages/ProjectPage'
import { SearchPage } from './view/pages/SearchPage'
import { SettingsPage } from './view/pages/SettingsPage'

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
        path: '/donate',
        component: DonatePage,
        allowUserWithNoAccess: false,
    },
    {
        path: '/project/:number',
        component: ProjectPage,
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
