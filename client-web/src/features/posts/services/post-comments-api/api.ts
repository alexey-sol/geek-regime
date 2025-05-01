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
import { appApi } from "@/app/store/api";

import {
    createTag,
    decrementPostCommentCount,
    decrementRootCommentReplyCount,
    getAllRootPostCommentsArg,
    incrementPostCommentCount,
    incrementRootCommentReplyCount,
    invalidateReplyComments,
    patchRootComment,
    patchRootCommentPage,
    softRemoveRootComment,
} from "./utils";
import * as cn from "./const";
import type * as tp from "./types";

const { COMMENTS, POSTS } = resources;

const appApiWithTag = appApi.enhanceEndpoints({
    addTagTypes: [cn.POST_COMMENTS_TYPE],
});

export const postCommentsApi = appApiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getAllRootPostComments: builder.query<PostCommentPageResponse, tp.GetAllPostCommentsArg>({
            query: (arg) => ({
                params: arg?.params,
                url: `/v1/${POSTS}/${arg.postId}/${COMMENTS}`,
            }),
            merge: mergePageContent,
            providesTags: () => [createTag(cn.ROOT_LIST_ID)],
            serializeQueryArgs: ({ endpointName, queryArgs }) =>
                `${endpointName}${queryArgs.postId}`,
            forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
        }),
        getPostCommentTreeByParentId: builder.query<PostCommentTreeResponse, number>({
            query: (postCommentId) => ({
                url: `/v1/${COMMENTS}/${postCommentId}`,
            }),
            providesTags: (result) => (result ? [createTag(result.id)] : [cn.POST_COMMENTS_TYPE]),
        }),
        createPostComment: builder.mutation<PostCommentResponse, tp.CreatePostCommentArg>({
            query: ({ meta, ...body }) => ({
                body,
                method: "POST",
                url: `/v1/${POSTS}/${body.postId}/${COMMENTS}`,
            }),
            invalidatesTags: invalidateReplyComments,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        const { rootCommentId } = arg.meta ?? {};

                        if (rootCommentId) { // Reply to another comment
                            dispatch(
                                postCommentsApi.util.updateQueryData(
                                    "getAllRootPostComments",
                                    getAllRootPostCommentsArg(arg.postId),
                                    (page) => incrementRootCommentReplyCount(page, rootCommentId),
                                ),
                            );
                        } else { // Root level comment
                            dispatch(
                                postCommentsApi.util.updateQueryData(
                                    "getAllRootPostComments",
                                    getAllRootPostCommentsArg(arg.postId),
                                    (page) => patchRootCommentPage(page, data),
                                ),
                            );
                        }

                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostCacheIfNeeded(dispatch, arg.meta, incrementPostCommentCount);
                    })
                    .catch(console.error);
            },
        }),
        removePostCommentById: builder.mutation<PostCommentResponse, tp.RemovePostCommentByIdArg>({
            query: ({ id }) => ({
                method: "DELETE",
                url: `/v1/${POSTS}/${COMMENTS}/${id}`,
            }),
            invalidatesTags: invalidateReplyComments,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        const { rootCommentId } = arg.meta;
                        const isRootComment = arg.id === rootCommentId;

                        if (isRootComment) {
                            dispatch(
                                postCommentsApi.util.updateQueryData(
                                    "getAllRootPostComments",
                                    getAllRootPostCommentsArg(arg.meta.postId),
                                    (page) => softRemoveRootComment(page, rootCommentId),
                                ),
                            );
                        }

                        // If it's not a root comment but a reply, we need only update the reply
                        // count of its root comment. Other stuff will be tackled by invalidating
                        // tags.
                        dispatch(
                            postCommentsApi.util.updateQueryData(
                                "getAllRootPostComments",
                                getAllRootPostCommentsArg(arg.meta.postId),
                                (page) => decrementRootCommentReplyCount(page, rootCommentId),
                            ),
                        );

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
                url: `/v1/${POSTS}/${COMMENTS}/${id}`,
            }),
            invalidatesTags: invalidateReplyComments,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            postCommentsApi.util.updateQueryData(
                                "getAllRootPostComments",
                                getAllRootPostCommentsArg(arg.meta.postId),
                                (page) => patchRootComment(page, arg.id, data),
                            ),
                        );
                    })
                    .catch(console.error);
            },
        }),
    }),
});

const updatePostCacheIfNeeded = (
    dispatch: ThunkDispatch<RootState, any, any>,
    meta: Partial<tp.HasPostSlug> | undefined,
    onPostCacheUpdate: (post: PostDetailsResponse) => void,
) => {
    if (!meta?.postSlug) {
        return;
    }

    dispatch(
        postsApi.util.updateQueryData("getPostBySlug", meta.postSlug, onPostCacheUpdate),
    );
};

export const {
    useGetAllRootPostCommentsQuery,
    useLazyGetPostCommentTreeByParentIdQuery,
    useCreatePostCommentMutation,
    useRemovePostCommentByIdMutation,
    useUpdatePostCommentByIdMutation,
    usePrefetch,
} = postCommentsApi;

// [1]. The function depends on api, so we can't declare it before it.
