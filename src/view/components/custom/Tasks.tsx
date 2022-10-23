import React, { FC } from 'react'

import { Task } from './Task'

export const Tasks: FC = () => {
    return (
        <div className="tasks_list">
            <Task
                title={
                    '#15158 W2G8 // Project Management -> Shifts: Self registration and Self unregistration'
                }
                projectTags={[
                    { text: 'W2G8', color: '#87d068' },
                    { text: 'Q4 2022', color: '#87d068' },
                    {
                        text: 'New features',
                        color: '#87d068',
                    },
                    { text: 'Inventuren', color: '#87d068' },
                ]}
            />
        </div>
    )
}
