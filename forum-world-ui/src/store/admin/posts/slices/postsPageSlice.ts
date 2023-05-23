import { IPost } from "@/models/IPost";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IPostsState {
    postToDelete?: IPost
    postToUpdate?: IPost
    postToContentEdit?: IPost
}

const initialState: IPostsState = {
    postToDelete: undefined,
    postToUpdate: undefined,
    postToContentEdit: undefined
}

const postsPageSlice = createSlice({
    name: 'postsPageSlice',
    initialState,
    reducers: {
        setPostForDelete(state, action: PayloadAction<IPost>) {
            state.postToDelete = action.payload
        },
        setPostForUpdate(state, action: PayloadAction<IPost>) {
            state.postToUpdate = action.payload
        },
        setPostToContentEdit(state, action: PayloadAction<IPost>) {
            state.postToContentEdit = action.payload
        },
        resetPostPageSlice() {
            return initialState
        }
    }
})

export const { setPostForDelete, setPostForUpdate, setPostToContentEdit, resetPostPageSlice } = postsPageSlice.actions;

export default postsPageSlice.reducer;