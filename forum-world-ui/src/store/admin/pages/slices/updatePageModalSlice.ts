import { IPage } from "@/models/IPage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUpdatePageModalSlice {
    page?: IPage
    isOpen: boolean
}

const initialState: IUpdatePageModalSlice = {
    page: undefined,
    isOpen: false
}

const updatePageModalSlice = createSlice({
    name: 'updatePageModal',
    initialState,
    reducers: {
        openUpdatePage(state, action: PayloadAction<IPage>) {
            state.page = action.payload
            state.isOpen = true
        },
        closeUpdatePage(state) {
            state.isOpen = false
        }
    }
})

export const {
    openUpdatePage,
    closeUpdatePage
} = updatePageModalSlice.actions

export default updatePageModalSlice.reducer