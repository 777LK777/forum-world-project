import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICountry } from "@/models/ICountry"

export interface IUpdateCountryModalState {
    country?: ICountry;
    isOpen: boolean
}

const initialState: IUpdateCountryModalState = {
    country: undefined,
    isOpen: false
}

const updateCountryModalSlice = createSlice({
    name: 'updateCountryModal',
    initialState,
    reducers: {
        openUpdateCountry(state, action: PayloadAction<ICountry>) {
            state.country = action.payload;
            state.isOpen = true;
        },
        closeUpdateCountry(state) {
            state.isOpen = false;
        }
    }
})

export const { openUpdateCountry, closeUpdateCountry } = updateCountryModalSlice.actions

export default updateCountryModalSlice.reducer
