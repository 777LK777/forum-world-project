// outside
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// users
import { usersApi } from "./users/users.api";

// countries
import { countriesApi } from "./admin/countries/countries.api";
import countriesPageSlice from "@/store/admin/countries/slices/countriesPageSlice";
import updateCountryModalSlice from "./admin/countries/slices/updateCountryModalSlice";

// themes
import { themesApi } from "./admin/themes/themes.api";
import themesPageSlice from "./admin/themes/slices/themesPageSlice";
import updateThemeModalSlice from "./admin/themes/slices/updateThemeModalSlice";

// shared
import deleteModalSlice from './admin/countries/slices/deleteConfirmModal';
import contentEditorModalSlice from "./admin/_shared/slices/contentEditorModalSlice";


const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    countriesPageSlice,
    updateCountryModalSlice,
    [themesApi.reducerPath] : themesApi.reducer,
    themesPageSlice, 
    updateThemeModalSlice,
    
    deleteModalSlice,
    contentEditorModalSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(countriesApi.middleware)
        .concat(themesApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
