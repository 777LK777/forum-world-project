import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICountry } from '@/models/ICountry';
import { IContent } from '@/models/IContent';


export const countriesApi = createApi({
    reducerPath: 'admin/countries/api',
    tagTypes: ["Country", "Content"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api/admin/`
    }),
    endpoints: build => ({
        getAllCountries: build.query<ICountry[], void>({
            query: () => ({
                url: 'countries'
            }),
            transformResponse: (response: ICountry[]) => {
                return response.sort((a, b) => (a.id ?? 0) - (b.id ?? 1));
            },
            providesTags: result => ['Country']
        }),
        createCountry: build.mutation<ICountry, ICountry>({
            query: (country) => ({
                url: 'countries',
                method: 'POST',
                body: { 
                    name: country.name, 
                    pathFragment: country.pathFragment,
                    flagImageUrl: country.flagImageUrl 
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }),
            invalidatesTags: ["Country"]
        }),
        updateCountry: build.mutation<ICountry, ICountry>({
            query: (country) => ({
                url: 'countries',
                method: 'PUT',
                body: { 
                    id: country.id,
                    name: country.name, 
                    pathFragment: country.pathFragment,
                    flagImageUrl: country.flagImageUrl 
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }),
            invalidatesTags: ["Country"]
        }),
        deleteCountry: build.mutation<ICountry, number>({
            query: (countryId) => ({
                url: `countries/${countryId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Country"]
        }),
        getCountryContent: build.query<IContent, ICountry>({
            query: (country) => ({
                url: `countries/${country.id}/content`
            })
        }),
        createContent: build.mutation<IContent, {countryId: number, content: IContent}>({
            query: (params) => ({
                url: `countries/${params.countryId}/content`,
                method: 'POST',
                body: {
                    ...params.content
                },
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
        }),
        updateContent: build.mutation<IContent, {countryId: number, content: IContent}>({
            query: (params) => ({
                url: `countries/${params.countryId}/content`,
                method: 'PUT',
                body: {
                    ...params.content
                },
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
        }),
        deleteContent: build.mutation<IContent, number>({
            query: (countryId: number) => ({
                url: `countries/${countryId}/content`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetAllCountriesQuery,
    useCreateCountryMutation, 
    useUpdateCountryMutation, 
    useDeleteCountryMutation,
    useLazyGetCountryContentQuery,
    useCreateContentMutation,
    useUpdateContentMutation,
    useDeleteContentMutation } = countriesApi;