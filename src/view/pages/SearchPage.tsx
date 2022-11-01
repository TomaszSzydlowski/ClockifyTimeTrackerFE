import { Collapse } from 'antd'
import { Input } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ProjectView } from '../../core/types/Project'
import { projectsClockifySelectors } from '../../store/features/clockify/projects/selectors'
import { yoursProjectsSelectors } from '../../store/features/clockify/yours-projects/selectors'
import { BaseLayout } from '../components/layouts/BaseLayout'

const { Panel } = Collapse
const { Search } = Input

export const SearchPage: FC = () => {
    const projects = useSelector(projectsClockifySelectors.getProjects)
    const yoursProjects = useSelector(yoursProjectsSelectors.getYoursProjects)
    const [yoursProjectsView, setYoursProjectsView] = useState<ProjectView[]>([])

    useEffect(() => {
        if (
            !projects ||
            projects.length === 0 ||
            !yoursProjects ||
            yoursProjects.length === 0
        )
            return

        const newYoursProjectsView = projects.filter((project) =>
            yoursProjects.includes(project.id),
        )
        setYoursProjectsView(newYoursProjectsView)
    }, [projects, yoursProjects])

    const onSearch = (value: string) => console.log(value)

    return (
        <BaseLayout>
            <div className="search_page">
                <Search placeholder="input search text" allowClear onSearch={onSearch} />
                <div className="search_page_collapse">
                    <Collapse>
                        {yoursProjectsView.map((projectView, index) => (
                            <Panel key={index} header={projectView.name}>
                                {projectView.tasks.map((task, index) => (
                                    <p key={index}>{task.name}</p>
                                ))}
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        </BaseLayout>
    )
}
