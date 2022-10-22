import { Layout } from 'antd'
import React, { FC, ReactNode } from 'react'

import { ModalContainer } from '../modals/ModalContainer'
import { FooterContent } from './FooterContent'

export interface BaseLayoutProps {
    headerHeight?: number
    footerHeight?: number
    children?: ReactNode
}

const { Header, Footer, Content } = Layout

export const BaseLayout: FC<BaseLayoutProps> = ({
    headerHeight = 75,
    footerHeight = 60,
    children,
}) => {
    return (
        <Layout>
            <Header>HEADER</Header>
            <Layout
                className="px-4"
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
