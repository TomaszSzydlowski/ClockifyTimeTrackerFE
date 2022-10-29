import { Layout } from 'antd'
import React, { FC, ReactNode } from 'react'

import { ModalContainer } from '../modals/ModalContainer'
import { FooterContent } from './FooterContent'
import { HeaderContent } from './HeaderContent'

export interface BaseLayoutProps {
    headerHeight?: number
    footerHeight?: number
    children?: ReactNode
}

const { Header, Footer, Content } = Layout

export const BaseLayout: FC<BaseLayoutProps> = ({
    headerHeight = 48,
    footerHeight = 120,
    children,
}) => {
    return (
        <Layout className="px-4">
            <Header>
                <HeaderContent />
            </Header>
            <Layout
                style={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
            >
                <Content>{children}</Content>
                <ModalContainer />
            </Layout>
            <Footer>
                <FooterContent />
            </Footer>
        </Layout>
    )
}
