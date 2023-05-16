import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '@/models/IPost';

export const postsApi = createApi({
    reducerPath: 'admin/posts/api',
    tagTypes: ["Post"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api/admin/`
    }),
    endpoints: build => ({
        getAllPosts: build.query<IPost[], void>({
            query: () => ({
                url: 'posts'
            }),
            transformResponse: (response: IPost[]) => {
                return response.sort((a, b) => (a.id ?? 0) - (b.id ?? 1));
            },
            providesTags: result => ["Post"]
        }),
        createPost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: "posts",
                method: "POST",
                body: {
                    name: post.name,
                    countryId: post.country.id,
                    themeId: post.theme?.id
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ["Post"]
        }),
        changePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: "posts",
                method: "PUT",
                body: {
                    ...post
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                } 
            }), 
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation<IPost, number>({
            query: (postId) => ({
                url: `posts/${postId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Post"]
        })
    })
});

export const {
    useGetAllPostsQuery,
    useCreatePostMutation,
    useChangePostMutation,
    useDeletePostMutation
} = postsApi;