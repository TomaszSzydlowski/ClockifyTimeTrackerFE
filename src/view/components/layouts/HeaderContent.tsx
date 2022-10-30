import { LeftOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import React, { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const { CheckableTag } = Tag

const tagsData = ['Yours', 'Current sprint', 'Last Task']

export const HeaderContent: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [selectedTags, setSelectedTags] = useState<string[]>(['Last Task'])
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag)
        setSelectedTags(nextSelectedTags)
    }
    return (
        <>
            {location.pathname.includes('/project') ? (
                <Button
                    style={{ padding: 0 }}
                    type="text"
                    onClick={() => navigate('/home')}
                >
                    <LeftOutlined />
                </Button>
            ) : (
                tagsData.map((tag) => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={(checked) => handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))
            )}
        </>
    )
}
