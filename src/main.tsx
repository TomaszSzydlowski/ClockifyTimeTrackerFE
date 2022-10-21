import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client'
import './view/styles/index.scss'
import {MsalAuthenticationTemplate, MsalProvider} from '@azure/msal-react'
import {msalInstance} from "./core/auth/authProvider"
import {InteractionType} from "@azure/msal-browser"
import {HashRouter, Navigate, Route, Routes} from "react-router-dom"
import {AppRedirect, AppRoutes} from "./routes"
import {RedirectUrlSanitizer} from "./view/components/app/RedirectUrlSanitizer"
import {CurrentUserSettings} from "./view/components/app/CurrentUserSettings"
import {buildStore} from "./store";

const authRequest = {scopes: ["User.Read"]}

const store = buildStore()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
        <MsalProvider instance={msalInstance}>
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={authRequest}>
                <RedirectUrlSanitizer/>
                <HashRouter>
                    <CurrentUserSettings/>
                    <Routes>
                        {AppRedirect.map((route, i: number) => (
                            <Route
                                key={`redirect-${i}`}
                                path={route.path}
                                element={<Navigate to={route.redirect}/>}/>
                        ))}
                        {AppRoutes.map((route, i: number) => (
                            <Route
                                path={route.path}
                                key={`route-${i}`}
                                element={<route.component/>}/>
                        ))}
                    </Routes>
                </HashRouter>
            </MsalAuthenticationTemplate>
        </MsalProvider>
        </Provider>
    </React.StrictMode>
)
