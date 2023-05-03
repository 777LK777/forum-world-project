import { IPost } from "@/models/IPost";
import { ITheme } from "@/models/ITheme";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IPostsState {
    postToDelete?: IPost
    postToUpdate?: IPost
}

const initialState: IPostsState = {
    postToDelete: undefined,
    postToUpdate: undefined
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
        }
    }
})

export const {setPostForDelete, setPostForUpdate} = postsPageSlice.actions;

export default postsPageSlice.reducer;