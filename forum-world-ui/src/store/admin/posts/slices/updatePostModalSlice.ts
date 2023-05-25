import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "@/models/IPost";

export interface IUpdatePostModalState {
    post?: IPost;
    isOpen: boolean;
}

const initialState: IUpdatePostModalState = {
    post: undefined,
    isOpen: false
}

const updatePostModalSlice = createSlice({
    name: 'updatePostModal',
    initialState,
    reducers: {
        openUpdatePost(state, action: PayloadAction<IPost>) {
            state.post = action.payload;
            state.isOpen = true;
        },
        closeUpdatePost(state) {
            state.isOpen = false;
        }
    }
})

export const { 
    openUpdatePost, 
    closeUpdatePost 
} = updatePostModalSlice.actions;

export default updatePostModalSlice.reducer;