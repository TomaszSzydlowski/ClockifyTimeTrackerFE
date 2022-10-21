import { Layout } from 'antd'
import React, { FC, ReactNode } from 'react'

import { ModalContainer } from '../modals/ModalContainer'

export interface BaseLayoutProps {
    headerHeight?: number
    footerHeight?: number
    children?: ReactNode
}

const { Header, Content } = Layout

export const BaseLayout: FC<BaseLayoutProps> = ({ headerHeight = 75, children }) => {
    return (
        <Layout>
            <Header>HEADER</Header>
            <Layout
                className="px-10 py-5"
                style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
            >
                <Content>{children}</Content>
                <ModalContainer />
            </Layout>
        </Layout>
    )
}
