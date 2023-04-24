import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICountry } from "@/models/ICountry";

export interface ICountriesState {
    countryToUpdate?: ICountry
    countryToDelete?: ICountry
}
  
const initialState: ICountriesState = {
    countryToUpdate: undefined,
    countryToDelete: undefined
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
        }
    }
})

export const { setCountryForUpdate, setCountryForDelete } = countriesPageSlice.actions;

export default countriesPageSlice.reducer;
