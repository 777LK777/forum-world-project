import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITheme } from '@/models/ITheme';
import { IThemeName } from '@/models/IThemeName';

export const themesApi = createApi({
    reducerPath: 'admin/themes/api',
    tagTypes: ["Theme"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api/admin/`
    }),
    endpoints: build => ({
        getAllThemes: build.query<ITheme[], void>({
            query: () => ({
                url: 'themes'
            }),
            transformResponse: (response: ITheme[]) => {
                return response.sort((a, b) => (a.id ?? 0) - (b.id ?? 1));
            },
            providesTags: result => ["Theme"]
        }),
        getThemesByNameFragment: build.query<IThemeName[], string>({
            query: (nameFragment: string) => ({
                url: 'themes/search',
                params: {
                    name: nameFragment
                }
            }),
        }),
        createTheme: build.mutation<ITheme, ITheme>({
            query: (theme) => ({
                url: 'themes',
                method: 'POST',
                body: { 
                    name: theme.name, 
                    pathFragment: theme.pathFragment 
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }),
            invalidatesTags: ["Theme"]
        }),
        changeTheme: build.mutation<ITheme, ITheme>({
            query: (theme) => ({
                url: 'themes',
                method: 'PUT',
                body: { 
                    id: theme.id,
                    name: theme.name, 
                    pathFragment: theme.pathFragment, 
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }),
            invalidatesTags: ["Theme"]
        }),
        deleteTheme: build.mutation<ITheme, number>({
            query: (themeId) => ({
                url: `themes/${themeId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Theme"]
        })
    })
});

export const {
    useGetAllThemesQuery,
    useGetThemesByNameFragmentQuery,
    useCreateThemeMutation, 
    useChangeThemeMutation, 
    useDeleteThemeMutation } = themesApi;