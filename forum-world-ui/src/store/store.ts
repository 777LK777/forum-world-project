import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { usersApi } from "./users/users.api";
import { countriesApi } from "./admin/countries/countries.api";
import countriesPageSlice from "../store/admin/countries/slices/countriesPageSlice";
import updateCountryModalSlice from "./admin/countries/slices/updateCountryModalSlice";
import deleteModalSlice from './admin/countries/slices/deleteConfirmModal'

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    countriesPageSlice,
    updateCountryModalSlice,
    deleteModalSlice,
    [countriesApi.reducerPath]: countriesApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(countriesApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
