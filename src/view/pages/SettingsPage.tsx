import { Button, Select } from 'antd'
import React, { FC } from 'react'

import { AZURE_DEV_OPS_TOKEN, CLOCKIFY_KEY } from '../../core/consts/consts'
import { BaseLayout } from '../components/layouts/BaseLayout'
import { ProjectList } from '../components/ProjectList'

const { Option } = Select

const children: React.ReactNode[] = []
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`)
}
export const SettingsPage: FC = () => {
    const clearData = () => {
        localStorage.removeItem(CLOCKIFY_KEY)
        localStorage.removeItem(AZURE_DEV_OPS_TOKEN)
        window.location.reload()
    }

    return (
        <BaseLayout>
            <ProjectList />
            <div className="settings_page__box">
                <Button type={'primary'} danger onClick={clearData}>
                    Clear data
                </Button>
            </div>
        </BaseLayout>
    )
}
