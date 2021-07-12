import { RootState } from './../../store/index';
import { createSlice } from "@reduxjs/toolkit"

interface State {
    projectModalOpen: boolean
}

const initialState: State = {
    projectModalOpen: false
}

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        openProjectModal(state) {
            state.projectModalOpen = true
        },
        closeProjectModal(state) {
            state.projectModalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen