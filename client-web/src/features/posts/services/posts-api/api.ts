import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resources } from "@eggziom/geek-regime-js-commons";
import { type ThunkDispatch } from "redux-thunk";

import {
    type PostDetailsResponse,
    type PostPreviewPageResponse,
} from "@/features/posts/models/dtos";
import { type RootState } from "@/app/store";

import { baseUrl, createTag, provideTags } from "./utils";
import * as cn from "./const";
import type * as tp from "./types";

export const postsApi = createApi({
    reducerPath: "postsApi",
    tagTypes: [cn.POSTS_TYPE],
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
            query: (params) => ({
                params: params ?? undefined,
                url: resources.POSTS,
            }),
            providesTags: (result) => provideTags(result?.content),
        }),
        getAllPostsByAuthor: builder.query<PostPreviewPageResponse, tp.GetAllPostsByAuthorArg>({
            query: ({ authorId, ...params }) => ({
                params,
                url: `${resources.USERS}/${authorId}/${resources.POSTS}`,
            }),
            providesTags: (result) => provideTags(result?.content),
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
                api.queryFulfilled
                    .then(({ data }) => {
                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostListCacheIfNeeded("getAllPosts", data, api.getState(), api.dispatch);
                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostListCacheIfNeeded("getAllPostsByAuthor", data, api.getState(), api.dispatch);
                    })
                    .catch(console.error);
            },
        }),
        voteOnPost: builder.mutation<PostDetailsResponse, tp.VoteOnPostArg>({
            query: ({ postId, userId, value }) => ({
                body: { value },
                method: "PUT",
                url: `${resources.USERS}/${userId}/${resources.POSTS}/${postId}/vote`,
            }),
            async onQueryStarted(_, api) {
                api.queryFulfilled
                    .then(({ data }) => {
                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostListCacheIfNeeded("getAllPosts", data, api.getState(), api.dispatch);
                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostListCacheIfNeeded("getAllPostsByAuthor", data, api.getState(), api.dispatch);
                    })
                    .catch(console.error);
            },
        }),
    }),
});

const updatePostListCacheIfNeeded = (
    queryName: "getAllPosts" | "getAllPostsByAuthor",
    data: PostDetailsResponse,
    state: RootState,
    dispatch: ThunkDispatch<RootState, unknown, any>,
) => {
    if (!data) {
        return;
    }

    const { id } = data;

    const caches = postsApi.util.selectInvalidatedBy(
        state,
        [{ type: cn.POSTS_TYPE, id }],
    );

    caches.forEach(({ endpointName, originalArgs }) => {
        if (endpointName !== queryName) {
            return;
        }

        dispatch(postsApi.util.updateQueryData(queryName, originalArgs, (draftPosts) => {
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
    useGetAllPostsByAuthorQuery,
    useGetPostBySlugQuery,
    useRemovePostByIdMutation,
    useUpdatePostByIdMutation,
    useVoteOnPostMutation,
} = postsApi;

// [1]. The function depends on api, so we can't declare it before it.
