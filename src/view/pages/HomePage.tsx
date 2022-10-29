import React, { FC } from 'react'

import { ProjectSwiper } from '../components/custom/ProjectSwiper'
import { Tasks } from '../components/custom/Tasks'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const HomePage: FC = () => {
    return (
        <BaseLayout>
            <div className="home_page_box">
                <Tasks />
                <ProjectSwiper />
            </div>
        </BaseLayout>
    )
}
