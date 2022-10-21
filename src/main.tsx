import React from 'react'
import ReactDOM from 'react-dom/client'
import './view/styles/index.scss'
import {MsalAuthenticationTemplate, MsalProvider} from '@azure/msal-react'
import {msalInstance} from "./core/auth/authProvider"
import {InteractionType} from "@azure/msal-browser"
import {HashRouter, Navigate, Route, Routes} from "react-router-dom"
import {AppRedirect, AppRoutes} from "./routes"
import {RedirectUrlSanitizer} from "./view/components/app/RedirectUrlSanitizer"

const authRequest = {scopes: ["User.Read"]}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={authRequest}>
                <RedirectUrlSanitizer/>
                <HashRouter>
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
    </React.StrictMode>
)
