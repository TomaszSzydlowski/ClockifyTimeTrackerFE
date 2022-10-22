import { Tag } from 'antd'
import React, { FC, useState } from 'react'

const { CheckableTag } = Tag

const tagsData = ['Yours', 'Current sprint', 'Solvti']

export const HeaderContent: FC = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['Yours'])

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag)
        setSelectedTags(nextSelectedTags)
    }

    return (
        <>
            {tagsData.map((tag) => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={(checked) => handleChange(tag, checked)}
                >
                    {tag}
                </CheckableTag>
            ))}
        </>
    )
}
