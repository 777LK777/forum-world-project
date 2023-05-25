import { IPage } from "@/models/IPage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IPagesState {
    pageToDelete?: IPage
    pageToUpdate?: IPage
    pageToContentEdit?: IPage
}

const initialState: IPagesState = {
    pageToDelete: undefined,
    pageToUpdate: undefined,
    pageToContentEdit: undefined
}

const pagesPageSlice = createSlice({
    name: 'pagesPageSlice',
    initialState,
    reducers: {
        setPageForDelete(state, action: PayloadAction<IPage>) {
            state.pageToDelete = action.payload
        },
        setPageForUpdate(state, action: PayloadAction<IPage>) {
            state.pageToUpdate = action.payload
        },
        setPageToContentEdit(state, action: PayloadAction<IPage>) {
            state.pageToContentEdit = action.payload
        },
        resetPagePageSlice() {
            return initialState
        }
    }
})

export const {
    setPageForDelete,
    setPageForUpdate,
    setPageToContentEdit,
    resetPagePageSlice
} = pagesPageSlice.actions;

export default pagesPageSlice.reducer;

