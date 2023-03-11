import { Button, notification } from 'antd'
import { NotificationPlacement } from 'antd/es/notification/interface'
import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useEffect } from 'react'

import HttpClient from '../../../core/helpers/HttpClient'

const updateVersionNotificationKey = 'update-version-notification'

export const VersionChecker: FC = () => {
    let versionDate: Dayjs | null = null

    const openNotification = (placement: NotificationPlacement) => {
        notification.info({
            message: 'New version is available',
            description: <NotificationBody />,
            placement,
            className: 'version-checker-block',
            key: updateVersionNotificationKey,
            duration: 0,
        })
    }

    const checkVersion = async () => {
        const payload = await HttpClient.head(`${window.location.origin}/version.js`, {
            headers: undefined,
        })
        const date = dayjs(payload.headers['last-modified'])

        if (versionDate !== null && date > versionDate) {
            openNotification('topRight')
        }

        versionDate = date
    }

    useEffect(() => {
        setInterval(() => checkVersion(), 30000)
    }, [])
    return null
}

const NotificationBody: FC = () => {
    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div>
            <span className={'version-checker-block__description'}>
                Refresh to get the latest version.
            </span>
            <div className={'version-checker-block__btn-container'}>
                <Button
                    className={'version-checker-block__btn-later'}
                    size={'small'}
                    onClick={() => notification.destroy(updateVersionNotificationKey)}
                >
                    LATER
                </Button>
                <Button type="primary" size={'small'} onClick={handleRefresh}>
                    REFRESH
                </Button>
            </div>
        </div>
    )
}
