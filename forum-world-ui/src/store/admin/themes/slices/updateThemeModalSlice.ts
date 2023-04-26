import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITheme } from "@/models/ITheme";

export interface IUpdateThemeModalState {
    theme?: ITheme;
    isOpen: boolean;
}

const initialState: IUpdateThemeModalState = {
    theme: undefined,
    isOpen: false
}

const updateThemeModalSlice = createSlice({
    name: 'updateThemeModal',
    initialState,
    reducers: {
        openUpdateTheme(state, action: PayloadAction<ITheme>) {
            state.theme = action.payload;
            state.isOpen = true;
        },
        closeUpdateTheme(state) {
            state.isOpen = false;
        }
    }
})

export const { openUpdateTheme, closeUpdateTheme } = updateThemeModalSlice.actions

export default updateThemeModalSlice.reducer