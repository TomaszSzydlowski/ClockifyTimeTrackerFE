import React, { FC } from 'react'

import { Tasks } from '../components/custom/Tasks'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const HomePage: FC = () => {
    return (
        <BaseLayout isHeader>
            <div className="home_page_box">
                <Tasks />
            </div>
        </BaseLayout>
    )
}
