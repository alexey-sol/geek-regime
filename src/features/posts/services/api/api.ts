import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fromPageDtoToPostsPage } from "@/features/posts/utils/converters";
import { PageDto } from "@/shared/types/models";
import { PostDto, PostsPage } from "@/features/posts/models/dtos";
import {
    postsBaseUrl as baseUrl,
    transformGetAllPostsArg,
} from "./api.utils";
import { GetAllPostsArg } from "./api.types";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostsPage, GetAllPostsArg | undefined>({
            query: (paging) => ({
                url: "",
                params: { paging: transformGetAllPostsArg(paging) },
            }),
            transformResponse(response: PageDto<PostDto[]>): Promise<PostsPage> | PostsPage {
                return fromPageDtoToPostsPage(response);
            },
        }),
        getPostBySlug: builder.query<PostDto, string>({
            query: (slug) => `${slug}`,
        }),
    }),
});

export const { useGetAllPostsQuery, useGetPostBySlugQuery } = postsApi;
