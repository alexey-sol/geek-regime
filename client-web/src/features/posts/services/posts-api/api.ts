import { resources } from "@eggziom/geek-regime-js-commons";
import { type ThunkDispatch } from "redux-thunk";

import {
    type PostDetailsResponse,
    type PostPreviewPageResponse,
    type PostPreviewResponse,
} from "@/features/posts/models/dtos";
import { type RootState } from "@/app/store";
import { appApi } from "@/app/store/api";
import { spacesApi } from "@/features/spaces/services/api";
import * as spaceCn from "@/features/spaces/services/api/const";

import { createTag, provideTags } from "./utils";
import * as cn from "./const";
import type * as tp from "./types";

const { POSTS, SPACES, USERS } = resources;

const appApiWithTag = appApi.enhanceEndpoints({
    addTagTypes: [cn.POSTS_TYPE],
});

export const postsApi = appApiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<PostDetailsResponse, tp.CreatePostArg>({
            query: (body) => ({
                body,
                method: "POST",
                url: `/v1/${POSTS}`,
            }),
            invalidatesTags: (result) => (result
                ? [createTag()]
                : []),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (!data) {
                        return;
                    }

                    dispatch(
                        postsApi.util.upsertQueryData("getPostBySlug", data.slug, data),
                    );

                    dispatch(spacesApi.util.invalidateTags([spaceCn.SPACES_TYPE]));
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        getAllPosts: builder.query<PostPreviewPageResponse, tp.GetAllPostsArg | void>({
            query: (params) => ({
                params: params ?? undefined,
                url: `/v1/${POSTS}`,
            }),
            providesTags: (result) => provideTags(result?.content),
        }),
        getAllPostsByAuthor: builder.query<PostPreviewPageResponse, tp.GetAllPostsByAuthorArg>({
            query: ({ authorId, ...params }) => ({
                params,
                url: `/v1/${USERS}/${authorId}/${POSTS}`,
            }),
            providesTags: (result) => provideTags(result?.content),
        }),
        getAllPostsBySpace: builder.query<PostPreviewPageResponse, tp.GetAllPostsBySpaceArg>({
            query: ({ spaceId, ...params }) => ({
                params,
                url: `/v1/${SPACES}/${spaceId}/${POSTS}`,
            }),
            providesTags: (result) => provideTags(result?.content),
        }),
        getAllPostsById: builder.query<PostPreviewResponse[], tp.GetAllPostsByIdArg>({
            query: (params) => ({
                params,
                url: `/v1/${POSTS}/id`,
            }),
            providesTags: (result) => provideTags(result),
        }),
        getPostBySlug: builder.query<PostDetailsResponse, tp.GetPostBySlugArg>({
            query: (slug) => `/v1/${POSTS}/${slug}`,
            providesTags: (result, error, id) => [createTag(id)],
        }),
        removePostById: builder.mutation<number, tp.RemovePostByIdArg>({
            query: (id) => ({
                method: "DELETE",
                url: `/v1/${POSTS}/${id}`,
            }),
            invalidatesTags: (result, error, id) => (result
                ? [createTag(cn.POSTS_TYPE), createTag(id)]
                : []),
        }),
        updatePostById: builder.mutation<PostDetailsResponse, tp.UpdatePostByIdArg>({
            query: ({ id, ...body }) => ({
                body,
                method: "PATCH",
                url: `/v1/${POSTS}/${id}`,
            }),
            async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostListCacheIfNeeded("getAllPosts", data, getState(), dispatch);
                        // eslint-disable-next-line no-use-before-define -- [1]
                        updatePostListCacheIfNeeded("getAllPostsByAuthor", data, getState(), dispatch);

                        dispatch(spacesApi.util.invalidateTags([spaceCn.SPACES_TYPE]));
                    })
                    .catch(console.error);
            },
        }),
        voteOnPost: builder.mutation<PostDetailsResponse, tp.VoteOnPostArg>({
            query: ({ postId, userId, value }) => ({
                body: { value },
                method: "PUT",
                url: `/v1/${USERS}/${userId}/${POSTS}/${postId}/vote`,
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
    useGetAllPostsBySpaceQuery,
    useGetAllPostsByIdQuery,
    useGetPostBySlugQuery,
    useRemovePostByIdMutation,
    useUpdatePostByIdMutation,
    useVoteOnPostMutation,
    usePrefetch,
} = postsApi;

// [1]. The function depends on api, so we can't declare it before it.
