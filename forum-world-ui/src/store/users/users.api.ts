import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../models/IUser'

export const usersApi = createApi({
    reducerPath: 'users/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/'
    }),
    endpoints: build => ({
        getAllUsers: build.query<IUser[], void>({
            query: () => ({
                url: 'users'
            })
        }),
        createUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: { name: user.name, email: user.email },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }),
        })
    })
})

export const { useGetAllUsersQuery, useCreateUserMutation } = usersApi
