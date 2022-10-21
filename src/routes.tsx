import { FC } from 'react'

import { HomePage } from './view/pages/HomePage'
import { PageNotFound } from './view/pages/PageNotFound'

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
