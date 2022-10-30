import { Swiper } from 'antd-mobile'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { projectsClockifySelectors } from '../../../store/features/clockify/projects/selectors'
import { yoursProjectsSelectors } from '../../../store/features/clockify/yours-projects/selectors'

interface SwiperProject {
    projectName?: string
    projectColor?: string
    projectId?: string
}

export const ProjectSwiper: FC = () => {
    const navigate = useNavigate()

    const projects = useSelector(projectsClockifySelectors.getProjects)
    const yoursProjects = useSelector(yoursProjectsSelectors.getYoursProjects)

    const [swiperProjects, setSwiperProjects] = useState<SwiperProject[]>([])
    useEffect(() => {
        if (
            yoursProjects &&
            yoursProjects.length > 0 &&
            projects &&
            projects.length > 0
        ) {
            const newSwiperProjects: SwiperProject[] = yoursProjects.map(
                (yourProject) => {
                    const project = projects.find((project) => project.id === yourProject)

                    return {
                        projectColor: project?.color,
                        projectId: project?.id,
                        projectName: project?.name,
                    }
                },
            )
            setSwiperProjects(newSwiperProjects)
        }
    }, [yoursProjects, projects])

    return (
        <div className="home_page_box_swiper">
            {swiperProjects.length > 0 && (
                <Swiper slideSize={65} trackOffset={16} loop stuckAtBoundary={false}>
                    {swiperProjects.map((swiperProject, index) => (
                        <Swiper.Item
                            key={index}
                            onClick={() =>
                                navigate(`/project/${swiperProject.projectId}`)
                            }
                        >
                            <div className="home_page_box_swiper__content">
                                <div
                                    className={'home_page_box_swiper__content--element'}
                                    style={{
                                        background: swiperProject.projectColor,
                                    }}
                                >
                                    <div className="home_page_box_swiper__content--element-text">
                                        {swiperProject.projectName}
                                    </div>
                                </div>
                            </div>
                        </Swiper.Item>
                    ))}
                </Swiper>
            )}
        </div>
    )
}
