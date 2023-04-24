import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IDeleteModalState<T> {
    isOpen: boolean;
    isDeleteSelected: boolean
}

const initialState: IDeleteModalState<any> = {
    isOpen: false,
    isDeleteSelected: false
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
        resetDeleteModal() {
            return initialState;
        }
    }
})

export const { openDeleteModal, closeDeleteModal, isDeleteConfirm, resetDeleteModal } = deleteModalSlice.actions

export default deleteModalSlice.reducer
