import { ITheme } from "@/models/ITheme";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface IThemesState {
    themeToDelete?: ITheme
    themeToUpdate?: ITheme
}

const initialState: IThemesState = {
    themeToDelete: undefined,
    themeToUpdate: undefined
}

const themesPageSlice = createSlice({
    name: 'themesPageSlice',
    initialState,
    reducers: {
        setThemeForDelete(state, action: PayloadAction<ITheme>) {
            state.themeToDelete = action.payload
        }, 
        setThemeForUpdate(state, action: PayloadAction<ITheme>) {
            state.themeToUpdate = action.payload;
        }
    }
})

export const {setThemeForDelete, setThemeForUpdate} = themesPageSlice.actions;

export default themesPageSlice.reducer;