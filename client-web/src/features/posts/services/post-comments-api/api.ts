import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resources } from "@eggziom/geek-regime-js-commons";
import type { ThunkDispatch } from "redux-thunk";

import {
    type PostCommentResponse,
    type PostCommentPageResponse,
    type PostCommentTreeResponse,
    type PostDetailsResponse,
} from "@/features/posts/models/dtos";
import { mergePageContent } from "@/shared/utils/api";
import { postsApi } from "@/features/posts/services/posts-api";
import type { RootState } from "@/app/store";

import {
    baseUrl, createTag, decrementPostCommentCount, incrementPostCommentCount,
} from "./utils";
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
                queryFulfilled
                    .then(() => {
                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostCacheIfNeeded(dispatch, arg.meta, incrementPostCommentCount);
                    })
                    .catch(console.error);
            },
        }),
        removePostCommentById: builder.mutation<PostCommentResponse, tp.RemovePostCommentByIdArg>({
            query: ({ id }) => ({
                method: "DELETE",
                url: `${resources.POSTS}/${resources.COMMENTS}/${id}`,
            }),
            invalidatesTags: (result, error, arg) => ((result && arg.meta?.rootCommentId)
                ? [createTag(arg.meta.rootCommentId), createTag(cn.ROOT_LIST_ID)]
                : [createTag(cn.ROOT_LIST_ID)]),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostCacheIfNeeded(dispatch, arg.meta, decrementPostCommentCount);
                    })
                    .catch(console.error);
            },
        }),
        updatePostCommentById: builder.mutation<PostCommentResponse, tp.UpdatePostCommentByIdArg>({
            query: ({ id, meta, ...body }) => ({
                body,
                method: "PATCH",
                url: `${resources.POSTS}/${resources.COMMENTS}/${id}`,
            }),
            invalidatesTags: (result, error, arg) => ((result && arg.meta?.rootCommentId) // TODO duplicated code
                ? [createTag(arg.meta.rootCommentId), createTag(cn.ROOT_LIST_ID)]
                : [createTag(cn.ROOT_LIST_ID)]),
        }),
    }),
});

const updatePostCacheIfNeeded = (
    dispatch: ThunkDispatch<RootState, any, any>,
    meta: Partial<tp.CommentMutationMeta> | undefined,
    onPostCacheUpdate: (post: PostDetailsResponse) => void,
) => {
    if (!meta?.parentPostSlug) {
        return;
    }

    dispatch(
        postsApi.util.updateQueryData("getPostBySlug", meta.parentPostSlug, onPostCacheUpdate),
    );
};

export const {
    useGetAllRootPostCommentsQuery,
    useLazyGetPostCommentTreeByParentIdQuery,
    useCreatePostCommentMutation,
    useRemovePostCommentByIdMutation,
    useUpdatePostCommentByIdMutation,
} = postCommentsApi;

// [1]. The function depends on api, so we can't declare it before it.
