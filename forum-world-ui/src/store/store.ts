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

// posts
import { postsApi } from "./admin/posts/posts.api";
import postsPageSlice from "./admin/posts/slices/postsPageSlice";
import updatePostModalSlice from "./admin/posts/slices/updatePostModalSlice";

// pages
import { pagesApi } from "./admin/pages/pages.api";
import pagesPageSlice from "./admin/pages/slices/pagesPageSlice";
import updatePageModalSlice from "./admin/pages/slices/updatePageModalSlice";

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
    [postsApi.reducerPath]: postsApi.reducer,
    postsPageSlice,
    updatePostModalSlice,
    [pagesApi.reducerPath]: pagesApi.reducer,
    pagesPageSlice,
    updatePageModalSlice,
    
    deleteModalSlice,
    contentEditorModalSlice,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(countriesApi.middleware)
        .concat(themesApi.middleware)
        .concat(postsApi.middleware)
        .concat(pagesApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
