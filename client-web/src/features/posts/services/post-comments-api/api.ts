import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resources } from "@eggziom/geek-regime-js-commons";

import {
    type PostCommentResponse,
    type PostCommentPageResponse,
    type PostCommentTreeResponse,
} from "@/features/posts/models/dtos";
import { mergePageContent } from "@/shared/utils/api";
import { postsApi } from "@/features/posts/services/posts-api";

import { baseUrl, createTag } from "./utils";
import * as cn from "./const";
import type * as tp from "./types";

export const postCommentsApi = createApi({
    reducerPath: "postCommentsApi",
    tagTypes: [cn.POST_COMMENTS_TYPE],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllRootPostComments: builder.query<PostCommentPageResponse, tp.GetAllPostCommentsArg>({
            query: (arg) => ({
                params: arg?.params,
                url: `${resources.POSTS}/${arg.postId}/${resources.COMMENTS}`,
            }),
            merge: mergePageContent,
            providesTags: [createTag(cn.ROOT_LIST_ID)],
            serializeQueryArgs: ({ endpointName, queryArgs }) =>
                `${endpointName}${queryArgs.postId}`,
            forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
        }),
        getPostCommentTreeByParentId: builder.query<PostCommentTreeResponse, number>({
            query: (postCommentId) => ({
                url: `${resources.COMMENTS}/${postCommentId}`,
            }),
            providesTags: (result) => (result ? [createTag(result.id)] : [cn.POST_COMMENTS_TYPE]),
        }),
        createPostComment: builder.mutation<PostCommentResponse, tp.CreatePostCommentArg>({
            query: ({ meta, ...body }) => ({
                body,
                method: "POST",
                url: `${resources.POSTS}/${body.postId}/${resources.COMMENTS}`,
            }),
            // Is this a reply to another comment? Then we need to re-fetch the tree (which is going
            // to have this reply) and the root comments list (to update the reply count which root
            // comments have).
            // Otherwise, just re-fetch the root comments list since the created comment belongs to
            // root ones.
            invalidatesTags: (result, error, arg) => ((result && arg.meta?.rootCommentId)
                ? [createTag(arg.meta.rootCommentId), createTag(cn.ROOT_LIST_ID)]
                : [createTag(cn.ROOT_LIST_ID)]),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { meta } = arg;

                try {
                    const { data } = await queryFulfilled;

                    if (!data || !meta?.parentPostSlug) {
                        return;
                    }

                    // Just increment the parent post's comment count. We'll invalidate comment tags
                    // via automatic means since it's getting too complicated to do this manually.
                    dispatch(
                        postsApi.util.updateQueryData("getPostBySlug", meta.parentPostSlug, (draftPost) => {
                            if (draftPost.meta) {
                                draftPost.meta.commentCount += 1;
                            }
                        }),
                    );
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        updatePostComment: builder.mutation<PostCommentResponse, tp.UpdatePostCommentArg>({
            query: ({ id, ...body }) => ({
                body,
                method: "PATCH",
                url: `${resources.POSTS}/${resources.COMMENTS}/${id}`,
            }),
            invalidatesTags: (result, error, arg) => ((result && arg.meta?.rootCommentId)
                ? [createTag(arg.meta.rootCommentId), createTag(cn.ROOT_LIST_ID)]
                : [createTag(cn.ROOT_LIST_ID)]),
        }),
    }),
});

export const {
    useGetAllRootPostCommentsQuery,
    useLazyGetPostCommentTreeByParentIdQuery,
    useCreatePostCommentMutation,
    useUpdatePostCommentMutation,
} = postCommentsApi;
