import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { usersApi } from "./users/users.api";
import { countriesApi } from "./admin/countries/countries.api";
import countriesPageSlice from "../store/admin/countries/slices/countriesPageSlice";
import updateCountryModalSlice from "./admin/countries/slices/updateCountryModalSlice";
import deleteModalSlice from './admin/countries/slices/deleteConfirmModal'
import { themesApi } from "./admin/themes/themes.api";
import themesPageSlice from "./admin/themes/slices/themesPageSlice";
import updateThemeModalSlice from "./admin/themes/slices/updateThemeModalSlice";
import { postsApi } from "./admin/posts/posts.api";
import postsPageSlice from "./admin/posts/slices/postsPageSlice";
import updatePostModalSlice from "./admin/posts/slices/updatePostModalSlice";

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    countriesPageSlice,
    updateCountryModalSlice,
    deleteModalSlice,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [themesApi.reducerPath]: themesApi.reducer,
    themesPageSlice, 
    updateThemeModalSlice,
    [postsApi.reducerPath]: postsApi.reducer,
    postsPageSlice,
    updatePostModalSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(countriesApi.middleware)
        .concat(themesApi.middleware)
        .concat(postsApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
