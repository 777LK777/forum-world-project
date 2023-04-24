import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICountry } from '@/models/ICountry';

export const countriesApi = createApi({
    reducerPath: 'admin/countries/api',
    tagTypes: ["Country"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.100.23:4000/api/admin/'
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
        changeCountry: build.mutation<ICountry, ICountry>({
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
        })
    })
});

export const {
    useGetAllCountriesQuery,
    useCreateCountryMutation, 
    useChangeCountryMutation, 
    useDeleteCountryMutation } = countriesApi;