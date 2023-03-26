import './view/styles/index.scss'
import './view/styles/index.scss'

import { ConfigProvider, theme } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { MainShortCuts } from './core/short-cuts/MainShortCuts'
import { AppRedirect, AppRoutes } from './routes'
import { buildStore } from './store'
import { ClockifyInitialData } from './view/components/app/ClockifyInitialData'
import { ClockifyIntervalRequests } from './view/components/app/ClockifyIntervalRequests'
import { RedirectUrlSanitizer } from './view/components/app/RedirectUrlSanitizer'
import { SetupUserSettings } from './view/components/app/SetupUserSettings'
import { TimeTrackingTabTitle } from './view/components/app/TimeTrackingTabTitle'
import { VersionChecker } from './view/components/app/VersionChecker'

const { darkAlgorithm } = theme

const store = buildStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
                <RedirectUrlSanitizer />
                <HashRouter>
                    <MainShortCuts />
                    <SetupUserSettings />
                    <ClockifyInitialData />
                    <ClockifyIntervalRequests />
                    <TimeTrackingTabTitle />
                    <VersionChecker />
                    <Routes>
                        {AppRedirect.map((route, i: number) => (
                            <Route
                                key={`redirect-${i}`}
                                path={route.path}
                                element={<Navigate to={route.redirect} />}
                            />
                        ))}
                        {AppRoutes.map((route, i: number) => (
                            <Route
                                path={route.path}
                                key={`route-${i}`}
                                element={<route.component />}
                            />
                        ))}
                    </Routes>
                </HashRouter>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>,
)
