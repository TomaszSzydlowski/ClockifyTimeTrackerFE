import { Swiper } from 'antd-mobile'
import React, { FC } from 'react'

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
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend
                    nibh enim, sit amet tempus lorem vestibulum in. Pellentesque posuere,
                    turpis ut pharetra bibendum, lorem metus eleifend odio, eget mollis ex
                    arcu ac augue. Sed ut eros tempor, molestie orci ac, condimentum
                    libero. Integer fringilla finibus lorem ut accumsan. Phasellus a nibh
                    ut erat gravida volutpat sit amet convallis est. Sed imperdiet a quam
                    ac accumsan. Vestibulum ut sollicitudin sapien. Sed sodales augue
                    lacus, eu rutrum purus vulputate id. Aenean quis eros lectus. Nulla
                    facilisis dapibus purus id facilisis. Suspendisse eu dignissim tortor,
                    vitae laoreet ex. Fusce eu eros eu urna fermentum semper. Fusce
                    aliquam eget neque sit amet auctor. Aenean quis eros lectus.Fusce
                    aliquam eget neque sit amet auctor. Aenean quis eros lectus.
                </p>
                <div className="home_page_box__swiper">
                    {' '}
                    <Swiper slideSize={50} trackOffset={20} loop stuckAtBoundary={false}>
                        {items}
                    </Swiper>
                </div>
            </div>
        </BaseLayout>
    )
}
