import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { postsBaseUrl as baseUrl } from "@/features/posts/services/api/api.utils";
import { fromPageDtoToPostsPage } from "@/features/posts/utils/converters";
import { PageDto, Paging } from "@/shared/types/models";
import { PostDto, PostsPage } from "@/features/posts/models/dtos";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostsPage, Paging | undefined>({
            query: (paging) => ({
                url: "",
                params: { paging: JSON.stringify(paging) },
            }),
            transformResponse(response: PageDto<PostDto[]>): Promise<PostsPage> | PostsPage {
                return fromPageDtoToPostsPage(response);
            },
        }),
        getPostById: builder.query<PostDto, number>({
            query: (id) => `${id}`,
        }),
    }),
});

export const { useGetAllPostsQuery, useGetPostByIdQuery } = postsApi;
