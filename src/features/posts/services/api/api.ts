import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { fromPageDtoToPostsPage } from "@/features/posts/utils/converters";
import type { PageDto } from "@/shared/types/models";
import type { PostDto, PostsPage } from "@/features/posts/models/dtos";

import type { CreatePostArg, GetAllPostsArg, UpdatePostByIdArg } from "./types";
import {
    postsBaseUrl as baseUrl,
    transformGetAllPostsArg,
} from "./utils";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        createPost: builder.mutation<PostDto, CreatePostArg>({
            query: (dto) => ({
                body: dto,
                method: "POST",
                url: "",
            }),
        }),
        getAllPosts: builder.query<PostsPage, GetAllPostsArg | undefined>({
            query: (paging) => ({
                params: { paging: transformGetAllPostsArg(paging) },
                url: "",
            }),
            transformResponse(response: PageDto<PostDto[]>): Promise<PostsPage> | PostsPage {
                return fromPageDtoToPostsPage(response);
            },
        }),
        getPostBySlug: builder.query<PostDto, string>({
            query: (slug) => slug,
        }),
        removePostById: builder.mutation<number, number>({
            query: (id) => ({
                method: "DELETE",
                url: `${id}`,
            }),
        }),
        updatePostById: builder.mutation<PostDto, UpdatePostByIdArg>({
            query: ({ id, ...dto }) => ({
                body: dto,
                method: "PATCH",
                url: `${id}`,
            }),
        }),
    }),
});

export const {
    useCreatePostMutation, useGetAllPostsQuery, useGetPostBySlugQuery, useUpdatePostByIdMutation,
} = postsApi;
