import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICountry } from "@/models/ICountry";

export interface ICountriesState {
    countryToUpdate?: ICountry
    countryToDelete?: ICountry
    countryToContentEdit?: ICountry
}
  
const initialState: ICountriesState = {
    countryToUpdate: undefined,
    countryToDelete: undefined,
    countryToContentEdit: undefined
};

const countriesPageSlice = createSlice({
    name: 'countriesPageSlice',
    initialState,
    reducers: {
        setCountryForUpdate(state, action: PayloadAction<ICountry>) {
            state.countryToUpdate = action.payload;
        },
        setCountryForDelete(state, action: PayloadAction<ICountry>) {
            state.countryToDelete = action.payload;
        },
        setCountryToContentEdit(state, action: PayloadAction<ICountry>) {
            state.countryToContentEdit = action.payload
        },
        resetCountryPageSlice(state) {
            return initialState
        }
    }
})

export const { setCountryForUpdate, setCountryForDelete, setCountryToContentEdit, resetCountryPageSlice } = countriesPageSlice.actions;

export default countriesPageSlice.reducer;
