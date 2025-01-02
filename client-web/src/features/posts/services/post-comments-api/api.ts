import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resources } from "@eggziom/geek-regime-js-commons";

import { type PostCommentPageResponse, type PostCommentTreeResponse } from "@/features/posts/models/dtos";
import { mergePageContent } from "@/shared/utils/api";

import * as cn from "./const";
import { baseUrl, createTag } from "./utils";
import type * as tp from "./types";

export const postCommentsApi = createApi({
    reducerPath: "postCommentsApi",
    tagTypes: [cn.TAG_TYPE],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllPostComments: builder.query<PostCommentPageResponse, tp.GetAllPostCommentsArg>({
            query: (arg) => ({
                params: arg?.params,
                url: `${resources.POSTS}/${arg.postId}/${resources.COMMENTS}`,
            }),
            merge: mergePageContent,
            providesTags: (result) => {
                const tag = createTag();

                return result
                    ? [...result.content.map(({ id }) => ({ type: tag.type, id })), tag]
                    : [tag];
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) =>
                `${endpointName}${queryArgs.postId}`,
            forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
        }),
        getPostCommentTreeByParentId: builder.query<PostCommentTreeResponse, number>({
            query: (postCommentId) => ({
                url: `${resources.COMMENTS}/${postCommentId}`,
            }),
        }),
    }),
});

export const {
    useGetAllPostCommentsQuery,
    useLazyGetPostCommentTreeByParentIdQuery,
} = postCommentsApi;
