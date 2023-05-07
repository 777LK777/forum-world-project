import { createSlice } from "@reduxjs/toolkit";

export interface IDeleteModalState {
    isOpen: boolean;
    isDeleteSelected: boolean;
    isDeleteDeclined: boolean;
}

const initialState: IDeleteModalState = {
    isOpen: false,
    isDeleteSelected: false,
    isDeleteDeclined: false
}

const deleteModalSlice = createSlice({
    name: 'deleteModal',
    initialState,
    reducers: {
        openDeleteModal(state) {
            state.isOpen = true;
        },
        closeDeleteModal(state) {
            state.isOpen = false;
        },
        isDeleteConfirm(state) {
            state.isDeleteSelected = true;
        },
        isDeclineConfirm(state) {
            state.isDeleteDeclined = true;
        },
        resetDeleteModal() {
            return initialState;
        }
    }
})

export const { openDeleteModal, closeDeleteModal, isDeleteConfirm, isDeclineConfirm, resetDeleteModal } = deleteModalSlice.actions

export default deleteModalSlice.reducer
