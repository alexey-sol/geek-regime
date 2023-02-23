import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { fromPageDtoToPostsPage } from "@/features/posts/utils/converters";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import * as cn from "@/features/posts/services/api/const";
import type { PostPreviewDto, PostDetailsDto, PostsPage } from "@/features/posts/models/dtos";
import type { PageDto } from "@/shared/models/dtos";

import {
    createTag,
    postsBaseUrl as baseUrl,
    transformGetAllPostsArg,
} from "./utils";
import type * as tp from "./types";

export const postsApi = createApi({
    reducerPath: "postsApi",
    tagTypes: [cn.POSTS_TAG_TYPE],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        createPost: builder.mutation<PostDetailsDto, tp.CreatePostArg>({
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
        getAllPosts: builder.query<PostsPage, tp.GetAllPostsArg>({
            query: (paging) => ({
                params: { paging: transformGetAllPostsArg(paging) },
                url: "",
            }),
            transformResponse: (response: PageDto<PostPreviewDto[]>): Promise<PostsPage>
                | PostsPage => fromPageDtoToPostsPage(response),
            providesTags: (result) => {
                const tag = createTag();

                return result
                    ? [...result.items.map(({ id }) => ({ type: tag.type, id })), tag]
                    : [tag];
            },
        }),
        getPostBySlug: builder.query<PostDetailsDto, tp.GetPostBySlugArg>({
            query: (slug) => slug,
            providesTags: (result, error, id) => [createTag(id)],
        }),
        removePostById: builder.mutation<number, tp.RemovePostByIdArg>({
            query: (id) => ({
                method: "DELETE",
                url: `${id}`,
            }),
            invalidatesTags: (result, error, id) => [createTag(id)],
        }),
        updatePostById: builder.mutation<PostDetailsDto, tp.UpdatePostByIdArg>({
            query: ({ id, ...body }) => ({
                body,
                method: "PATCH",
                url: `${id}`,
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
                const { page, size } = selectPagingOptions(getState());
                const pagingArg: tp.GetAllPostsArg = { page, size };
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
