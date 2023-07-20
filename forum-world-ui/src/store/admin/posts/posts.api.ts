import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '@/models/IPost';
import { IContent } from '@/models/IContent';

export const postsApi = createApi({
    reducerPath: 'admin/posts/api',
    tagTypes: ["Post"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_GATEWAY_ORIGIN}/admin/`
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
        }),
        getPostContent: build.query<IContent, IPost>({
            query: (post) => ({
                url: `posts/${post.id}/content`
            })
        }),
        createPostContent: build.mutation<IContent, {postId: number, content: IContent}>({
            query: (params) => ({
                url: `posts/${params.postId}/content`,
                method: 'POST',
                body: {
                    ...params.content
                },
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            })
        }),
        updatePostContent: build.mutation<IContent, {postId: number, content: IContent}>({
            query: (params) => ({
                url: `posts/${params.postId}/content`,
                method: 'PUT',
                body: {
                    ...params.content
                },
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            })
        }),
        deletePostContent: build.mutation<IContent, number>({
            query: (postId: number) => ({
                url: `posts/${postId}/content`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetAllPostsQuery,
    useCreatePostMutation,
    useChangePostMutation,
    useDeletePostMutation,
    useLazyGetPostContentQuery,
    useCreatePostContentMutation,
    useUpdatePostContentMutation,
    useDeletePostContentMutation
} = postsApi;