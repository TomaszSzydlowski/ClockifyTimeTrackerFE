﻿import { AnyAction } from '@reduxjs/toolkit'
import ls from 'localstorage-slim'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { YOURS_PROJECTS } from '../../../core/consts/consts'
import { ModalType } from '../../../core/types/enums/ModalType'
import { projectsAsyncActions } from '../../../store/features/clockify/projects/asyncActions'
import { projectsClockifySelectors } from '../../../store/features/clockify/projects/selectors'
import { tasksAsyncActions } from '../../../store/features/clockify/tasks/asyncActions'
import { userAsyncActions } from '../../../store/features/clockify/user/asyncActions'
import { userClockifySelectors } from '../../../store/features/clockify/user/selectors'
import { yoursProjectsActions } from '../../../store/features/clockify/yours-projects'
import { modalActions } from '../../../store/features/modals/modal'
import { userSecretsSelectors } from '../../../store/features/user-secrets/selectors'
import { BaseModalProps } from '../modals/UserSecretsModal'

export const ClockifyInitialData: FC = () => {
    const dispatch = useDispatch()
    const clockifyApiKey = useSelector(userSecretsSelectors.getUserSecretsClockifyApiKey)
    const userId = useSelector(userClockifySelectors.getUserId)
    const workspaceId = useSelector(userClockifySelectors.getDefaultWorkspaceId)
    const projects = useSelector(projectsClockifySelectors.getprojects)
    const yoursProjects = ls.get(YOURS_PROJECTS, { decrypt: true })

    const YoursProjectsModalProps: BaseModalProps = {
        title: 'Please select your favourite projects',
        description: 'To avoid to many request, please select project in which you work',
    }

    useEffect(() => {
        if (clockifyApiKey !== undefined) {
            dispatch(userAsyncActions.getClockifyUser() as unknown as AnyAction)
        }
    }, [clockifyApiKey])

    useEffect(() => {
        if (userId !== undefined && workspaceId !== undefined)
            dispatch(
                projectsAsyncActions.getClockifyProjects(
                    workspaceId,
                ) as unknown as AnyAction,
            )
    }, [userId, workspaceId])

    useEffect(() => {
        if (!yoursProjects && projects !== undefined && projects.length > 0)
            dispatch(
                modalActions.showModal({
                    type: ModalType.YoursProjectsModal,
                    props: YoursProjectsModalProps,
                }),
            )
    }, [yoursProjects, projects])

    useEffect(() => {
        if (workspaceId !== undefined && yoursProjects !== undefined) {
            dispatch(yoursProjectsActions.setYoursProjects(yoursProjects as string[]))
            dispatch(
                tasksAsyncActions.getClockifyTasksForProjectsIds({
                    workspaceId,
                    projectsIds: yoursProjects as string[],
                }) as unknown as AnyAction,
            )
        }
    }, [yoursProjects])

    return null
}
