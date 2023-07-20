import { IContent } from '@/models/IContent';
import { IPage } from '@/models/IPage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pagesApi = createApi({
    reducerPath: 'admin/pages/api',
    tagTypes: ["Page"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_GATEWAY_ORIGIN}/admin/`
    }),
    endpoints: build => ({
        getAllPages: build.query<IPage[], void>({
            query: () => ({
                url: 'pages'
            }),
            transformResponse: (response: IPage[]) => {
                return response.sort((a, b) => (a.id ?? 0) - (b.id ?? 1));
            },
            providesTags: ["Page"]
        }),
        createPage: build.mutation<IPage, IPage>({
            query: (page) => ({
                url: "pages",
                method: "POST",
                body: {
                    name: page.name,
                    pathFragment: page.pathFragment
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ["Page"]
        }),
        changePage: build.mutation<IPage, IPage>({
            query: (page) => ({
                url: "pages",
                method: "PUT",
                body: {
                    ...page
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                } 
            }),
            invalidatesTags: ["Page"]
        }),
        deletePage: build.mutation<IPage, number>({
            query: (pageId) => ({
                url: `pages/${pageId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Page"]
        }),
        getPageContent: build.query<IContent, IPage>({
            query: (page) => ({
                url: `pages/${page.id}/content`
            })
        }),
        createPageContent: build.mutation<IContent, {pageId: number, content: IContent}>({
            query: (params) => ({
                url: `pages/${params.pageId}/content`,
                method: 'POST',
                body: {
                    ...params.content
                },
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            })
        }),
        updatePageContent: build.mutation<IContent, {pageId: number, content: IContent}>({
            query: (params) => ({
                url: `pages/${params.pageId}/content`,
                method: 'PUT',
                body: {
                    ...params.content
                },
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            })
        }),
        deletePageContent: build.mutation<IContent, number>({
            query: (pageId: number) => ({
                url: `pages/${pageId}/content`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetAllPagesQuery,
    useCreatePageMutation,
    useChangePageMutation,
    useDeletePageMutation,
    useLazyGetPageContentQuery,
    useCreatePageContentMutation,
    useUpdatePageContentMutation,
    useDeletePageContentMutation
} = pagesApi