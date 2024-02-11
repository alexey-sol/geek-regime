import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recipe } from "@reduxjs/toolkit/dist/query/core/buildThunks";

import { appConfig } from "@/config/app";
import { fromPageDtoToPostsPage } from "@/features/posts/utils/converters";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import * as cn from "@/features/posts/services/api/const";
import type { PostDetailsDto, PostPreviewDto, PostsPage } from "@/features/posts/models/dtos";
import type { PageDto } from "@/shared/models/dtos";

import {
    baseUrl, createTag, getDataUpdaters, transformPaging,
} from "./utils";
import type * as tp from "./types";

const { apiPostsResource, apiUsersResource } = appConfig;

export const postsApi = createApi({
    reducerPath: "postsApi",
    tagTypes: [cn.POSTS_TAG_TYPE],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        createPost: builder.mutation<PostDetailsDto, tp.CreatePostArg>({
            query: (body) => ({
                body,
                method: "POST",
                url: apiPostsResource,
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
        getAllPosts: builder.query<PostsPage, tp.GetAllPostsArg | void>({
            query: (arg) => {
                const { authorId } = arg?.filter ?? {};

                const url = (authorId)
                    ? `${apiUsersResource}/${authorId}/${apiPostsResource}`
                    : apiPostsResource;

                return ({
                    params: { paging: transformPaging(arg?.paging) },
                    url,
                });
            },
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
            query: (slug) => `${apiPostsResource}/${slug}`,
            providesTags: (result, error, id) => [createTag(id)],
        }),
        removePostById: builder.mutation<number, tp.RemovePostByIdArg>({
            query: (id) => ({
                method: "DELETE",
                url: `${apiPostsResource}/${id}`,
            }),
            invalidatesTags: (result, error, id) => [createTag(id)],
        }),
        updatePostById: builder.mutation<PostDetailsDto, tp.UpdatePostByIdArg>({
            query: ({ id, ...body }) => ({
                body,
                method: "PATCH",
                url: `${apiPostsResource}/${id}`,
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
                const paging = selectPagingOptions(getState());
                const { data } = await queryFulfilled;

                if (data) {
                    const updatePostsDataRecipe: Recipe<PostsPage> = (draftPosts) => {
                        const itemIndex = draftPosts.items.findIndex((post) => post.id === id);

                        if (itemIndex >= 0) {
                            draftPosts.items[itemIndex] = data;
                        }
                    };

                    const {
                        updatePostData,
                        updatePostsData,
                        updatePostsByAuthorData,
                    } = getDataUpdaters(dispatch, postsApi.util);

                    updatePostData(data);
                    updatePostsData(paging, updatePostsDataRecipe);
                    updatePostsByAuthorData(paging, data.author.id, updatePostsDataRecipe);
                }
            },
        }),
    }),
});

export type PostsApiUtil = typeof postsApi.util;

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetPostBySlugQuery,
    useUpdatePostByIdMutation,
} = postsApi;
