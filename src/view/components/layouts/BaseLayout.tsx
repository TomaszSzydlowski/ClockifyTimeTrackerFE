﻿import { Layout } from 'antd'
import React, { FC, ReactNode } from 'react'

import { ModalContainer } from '../modals/ModalContainer'
import { FooterContent } from './FooterContent'
import { HeaderContent } from './HeaderContent'

export interface BaseLayoutProps {
    isHeader?: boolean
    hideFooter?: boolean
    headerHeight?: number
    footerHeight?: number
    children?: ReactNode
}

const { Header, Footer, Content } = Layout

export const BaseLayout: FC<BaseLayoutProps> = ({
    isHeader,
    hideFooter,
    headerHeight = 48,
    footerHeight = 120,
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
                style={{
                    minHeight: `calc(100vh - ${
                        isHeader ? headerHeight : 0 + (hideFooter ? 0 : footerHeight)
                    }px)`,
                }}
            >
                <Content>{children}</Content>
                <ModalContainer />
            </Layout>
            {!hideFooter && (
                <Footer>
                    <FooterContent />
                </Footer>
            )}
        </Layout>
    )
}
