import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { postsBaseUrl as baseUrl } from "@/features/posts/services/api/api.utils";
import { Post, PostsPage } from "@/features/posts/types/models";
import { fromPageDtoToPostsPage } from "@/features/posts/utils/converters";
import { PageDto, Paging } from "@/shared/types/models";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostsPage, Paging | undefined>({
            query: (paging) => ({
                url: "",
                params: { paging: JSON.stringify(paging) },
            }),
            transformResponse(response: PageDto<Post[]>): Promise<PostsPage> | PostsPage {
                return fromPageDtoToPostsPage(response);
            },
        }),
        getPostById: builder.query<Post, number>({
            query: (id) => `${id}`,
        }),
    }),
});

export const { useGetAllPostsQuery, useGetPostByIdQuery } = postsApi;
