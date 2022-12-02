import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import * as constants from "@/features/posts/services/api/const";
import { fromPageDtoToPostsPage } from "@/features/posts/utils/converters";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import type { PostDto, PostsPage } from "@/features/posts/models/dtos";
import type { PageDto } from "@/shared/models/dtos";

import {
    createTag,
    postsBaseUrl as baseUrl,
    transformGetAllPostsArg,
} from "./utils";
import type * as types from "./types";

export const postsApi = createApi({
    reducerPath: "postsApi",
    tagTypes: [constants.POSTS_TAG_TYPE],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        createPost: builder.mutation<PostDto, types.CreatePostArg>({
            query: (body) => ({
                body,
                method: "POST",
                url: "",
            }),
            invalidatesTags: (result) => [createTag(result?.id)],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                if (data) {
                    dispatch(
                        postsApi.util.upsertQueryData("getPostBySlug", data.slug, data),
                    );
                }
            },
        }),
        getAllPosts: builder.query<PostsPage, types.GetAllPostsArg>({
            query: (paging) => ({
                params: { paging: transformGetAllPostsArg(paging) },
                url: "",
            }),
            transformResponse: (response: PageDto<PostDto[]>): Promise<PostsPage> | PostsPage =>
                fromPageDtoToPostsPage(response),
            providesTags: (result) => {
                const tag = createTag();

                return result
                    ? [...result.items.map(({ id }) => ({ type: tag.type, id })), tag]
                    : [tag];
            },
        }),
        getPostBySlug: builder.query<PostDto, types.GetPostBySlugArg>({
            query: (slug) => slug,
            providesTags: (result, error, id) => [createTag(id)],
        }),
        removePostById: builder.mutation<number, types.RemovePostByIdArg>({
            query: (id) => ({
                method: "DELETE",
                url: `${id}`,
            }),
            invalidatesTags: (result, error, id) => [createTag(id)],
        }),
        updatePostById: builder.mutation<PostDto, types.UpdatePostByIdArg>({
            query: ({ id, ...body }) => ({
                body,
                method: "PATCH",
                url: `${id}`,
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
                const { page, size } = selectPagingOptions(getState());
                const pagingArg: types.GetAllPostsArg = { page, size };
                const { data } = await queryFulfilled;

                if (data) {
                    dispatch(
                        postsApi.util.upsertQueryData("getPostBySlug", data.slug, data),
                    );

                    dispatch(
                        postsApi.util.updateQueryData("getAllPosts", pagingArg, (draftPosts) => {
                            const itemIndex = draftPosts.items.findIndex((post) => post.id === id);

                            if (itemIndex >= 0) {
                                draftPosts.items[itemIndex] = data;
                            }
                        }),
                    );
                }
            },
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetPostBySlugQuery,
    useUpdatePostByIdMutation,
} = postsApi;
