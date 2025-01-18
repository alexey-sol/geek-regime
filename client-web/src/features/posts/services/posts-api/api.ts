import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resources } from "@eggziom/geek-regime-js-commons";
import { type ThunkDispatch } from "redux-thunk";

import {
    type PostDetailsResponse,
    type PostPreviewPageResponse,
} from "@/features/posts/models/dtos";
import { type RootState } from "@/app/store";

import * as cn from "./const";
import { baseUrl, createTag } from "./utils";
import type * as tp from "./types";

export const postsApi = createApi({
    reducerPath: "postsApi",
    tagTypes: [cn.TAG_TYPE],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        createPost: builder.mutation<PostDetailsResponse, tp.CreatePostArg>({
            query: (body) => ({
                body,
                method: "POST",
                url: resources.POSTS,
            }),
            invalidatesTags: (result) => [createTag(result?.id)],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (!data) {
                        return;
                    }

                    dispatch(
                        postsApi.util.upsertQueryData("getPostBySlug", data.slug, data),
                    );
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        getAllPosts: builder.query<PostPreviewPageResponse, tp.GetAllPostsArg | void>({
            query: (arg) => {
                const { params } = arg ?? {};
                const { authorId } = params?.filter ?? {};

                const url = (authorId)
                    ? `${resources.USERS}/${authorId}/${resources.POSTS}`
                    : resources.POSTS;

                return ({ params, url });
            },
            providesTags: (result) => {
                const tag = createTag();

                return result
                    ? [...result.content.map(({ id }) => ({ type: tag.type, id })), tag]
                    : [tag];
            },
        }),
        getPostBySlug: builder.query<PostDetailsResponse, tp.GetPostBySlugArg>({
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
        updatePostById: builder.mutation<PostDetailsResponse, tp.UpdatePostByIdArg>({
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
        voteOnPost: builder.mutation<PostDetailsResponse, tp.VoteOnPostArg>({
            query: ({ postId, userId, value }) => ({
                body: { value },
                method: "PUT",
                url: `${resources.USERS}/${userId}/${resources.POSTS}/${postId}/vote`,
            }),
            async onQueryStarted(_, api) {
                const { data } = await api.queryFulfilled;

                // eslint-disable-next-line no-use-before-define -- [1]
                updatePostCacheIfNeeded(data, api.getState(), api.dispatch);
            },
        }),
    }),
});

const updatePostCacheIfNeeded = (
    data: PostDetailsResponse,
    state: RootState,
    dispatch: ThunkDispatch<RootState, any, any>,
) => {
    if (!data) {
        return;
    }

    const { id } = data;

    const caches = postsApi.util.selectInvalidatedBy(
        state,
        [{ type: cn.TAG_TYPE, id }],
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
    useVoteOnPostMutation,
} = postsApi;

// [1]. The function depends on postsApi, so we can't declare it before it.
