import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resources } from "@eggziom/geek-regime-js-commons";

import * as cn from "@/features/posts/services/api/const";
import {
    type UserPostDetailsResponse, type UserPostPreviewPageResponse,
} from "@/features/posts/models/dtos";
import { transformQueryParams } from "@/shared/utils/converters";

import { baseUrl, createTag } from "./utils";
import type * as tp from "./types";

export const postsApi = createApi({
    reducerPath: "postsApi",
    tagTypes: [cn.POSTS_TAG_TYPE],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        createPost: builder.mutation<UserPostDetailsResponse, tp.CreatePostArg>({
            query: (body) => ({
                body,
                method: "POST",
                url: resources.POSTS,
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
        getAllPosts: builder.query<UserPostPreviewPageResponse, tp.GetAllPostsArg | void>({
            query: (arg) => {
                const { authorId } = arg?.filter ?? {};

                const url = (authorId)
                    ? `${resources.USERS}/${authorId}/${resources.POSTS}`
                    : resources.POSTS;

                return ({
                    params: transformQueryParams(arg?.params),
                    url,
                });
            },
            providesTags: (result) => {
                const tag = createTag();

                return result
                    ? [...result.content.map(({ id }) => ({ type: tag.type, id })), tag]
                    : [tag];
            },
        }),
        getPostBySlug: builder.query<UserPostDetailsResponse, tp.GetPostBySlugArg>({
            query: (slug) => `${resources.POSTS}/${slug}`,
            providesTags: (result, error, id) => [createTag(id)],
        }),
        removePostById: builder.mutation<number, tp.RemovePostByIdArg>({
            query: (id) => ({
                method: "DELETE",
                url: `${resources.POSTS}/${id}`,
            }),
            invalidatesTags: (result, error, id) => [createTag(id)],
        }),
        updatePostById: builder.mutation<UserPostDetailsResponse, tp.UpdatePostByIdArg>({
            query: ({ id, ...body }) => ({
                body,
                method: "PATCH",
                url: `${resources.POSTS}/${id}`,
            }),
            async onQueryStarted({ id }, api) {
                const { data } = await api.queryFulfilled;

                if (!data) {
                    return;
                }

                const caches = postsApi.util.selectInvalidatedBy(
                    api.getState(),
                    [{ type: cn.POSTS_TAG_TYPE, id }],
                );

                caches.forEach(({ endpointName, originalArgs }) => {
                    if (endpointName !== "getAllPosts") {
                        return;
                    }

                    api.dispatch(postsApi.util.updateQueryData("getAllPosts", originalArgs, (draftPosts) => {
                        const itemIndex = draftPosts.content.findIndex((post) => post.id === id);

                        if (itemIndex >= 0) {
                            draftPosts.content[itemIndex] = data;
                        }
                    }));
                });

                api.dispatch(
                    postsApi.util.upsertQueryData("getPostBySlug", data.slug, data),
                );
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
