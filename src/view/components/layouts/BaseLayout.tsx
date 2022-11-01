import { Layout } from 'antd'
import React, { FC, ReactNode } from 'react'

import { ModalContainer } from '../modals/ModalContainer'
import { FooterContent } from './FooterContent'
import { HeaderContent } from './HeaderContent'

export interface BaseLayoutProps {
    isHeader?: boolean
    headerHeight?: number
    footerHeight?: number
    children?: ReactNode
}

const { Header, Footer, Content } = Layout

export const BaseLayout: FC<BaseLayoutProps> = ({
    isHeader,
    headerHeight = 0,
    footerHeight = 124,
    children,
}) => {
    return (
        <Layout className="px-4">
            {isHeader && (
                <Header>
                    <HeaderContent />
                </Header>
            )}
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
