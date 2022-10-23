import { Swiper } from 'antd-mobile'
import React, { FC } from 'react'

import { Tasks } from '../components/custom/Tasks'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const HomePage: FC = () => {
    const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

    const items = colors.map((color, index) => (
        <Swiper.Item key={index}>
            <div className={'content'} style={{ background: color, height: '100px' }}>
                {index + 1}
            </div>
        </Swiper.Item>
    ))
    return (
        <BaseLayout>
            <div className="home_page_box">
                <Tasks />
                <div className="home_page_box__swiper">
                    <Swiper slideSize={50} trackOffset={20} loop stuckAtBoundary={false}>
                        {items}
                    </Swiper>
                </div>
            </div>
        </BaseLayout>
    )
}
