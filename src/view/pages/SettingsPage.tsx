﻿import { Button } from 'antd'
import React, { FC } from 'react'

import { AZURE_DEV_OPS_TOKEN, CLOCKIFY_KEY } from '../../core/consts/consts'
import { BaseLayout } from '../components/layouts/BaseLayout'

export const SettingsPage: FC = () => {
    const clearData = () => {
        localStorage.removeItem(CLOCKIFY_KEY)
        localStorage.removeItem(AZURE_DEV_OPS_TOKEN)
        window.location.reload()
    }

    return (
        <BaseLayout>
            <Button type={'primary'} onClick={clearData}>
                Clear data
            </Button>
        </BaseLayout>
    )
}
