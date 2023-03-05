import React, { FC } from 'react'

import workInProgressImg from '../../assets/work-in-progress.png'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const StatisticsPage: FC = () => {
    return (
        <BaseLayout>
            <img
                alt={'work in progress'}
                src={workInProgressImg}
                width={200}
                style={{ margin: 'auto', display: 'block' }}
            />
        </BaseLayout>
    )
}
