import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resources } from "@eggziom/geek-regime-js-commons";
import { type ThunkDispatch } from "redux-thunk";

import * as cn from "@/features/posts/services/api/const";
import {
    type UserPostDetailsResponse, type UserPostPreviewPageResponse,
} from "@/features/posts/models/dtos";
import { transformQueryParams } from "@/shared/utils/converters";
import { type RootState } from "@/app/store";

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
            async onQueryStarted(_, api) {
                const { data } = await api.queryFulfilled;

                // eslint-disable-next-line no-use-before-define -- [1]
                updatePostCacheIfNeeded(data, api.getState(), api.dispatch);
            },
        }),
        voteForPost: builder.mutation<UserPostDetailsResponse, tp.VoteForPostArg>({
            query: ({ postId, userId, value }) => ({
                body: { value },
                method: "PUT",
                url: `${resources.USERS}/${userId}/${resources.POSTS}/${postId}/vote`,
            }),
            // FIXME check if this works
            async onQueryStarted(_, api) {
                const { data } = await api.queryFulfilled;

                // eslint-disable-next-line no-use-before-define -- [1]
                updatePostCacheIfNeeded(data, api.getState(), api.dispatch);
            },
        }),
    }),
});

const updatePostCacheIfNeeded = (
    data: UserPostDetailsResponse,
    state: RootState,
    dispatch: ThunkDispatch<RootState, any, any>,
) => {
    if (!data) {
        return;
    }

    const { id } = data;

    const caches = postsApi.util.selectInvalidatedBy(
        state,
        [{ type: cn.POSTS_TAG_TYPE, id }],
    );

    caches.forEach(({ endpointName, originalArgs }) => {
        if (endpointName !== "getAllPosts") {
            return;
        }

        dispatch(postsApi.util.updateQueryData("getAllPosts", originalArgs, (draftPosts) => {
            const itemIndex = draftPosts.content.findIndex((post) => post.id === id);

            if (itemIndex >= 0) {
                draftPosts.content[itemIndex] = data;
            }
        }));
    });

    dispatch(
        postsApi.util.upsertQueryData("getPostBySlug", data.slug, data),
    );
};

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetPostBySlugQuery,
    useUpdatePostByIdMutation,
    useVoteForPostMutation,
} = postsApi;

// [1]. The function depends on postsApi, so we can't declare it before it.
