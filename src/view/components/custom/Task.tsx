import React, { FC } from 'react'

import { projectTag, TaskCard } from './TaskCard'

interface TaskProps {
    title: string
    projectTags: projectTag[]
}

export const Task: FC<TaskProps> = ({ title, projectTags }) => {
    return <TaskCard title={title} projectTags={projectTags} />
}
