import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recipe, UpdateQueryDataThunk } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";

import { appConfig } from "@/config/app";
import { fromPageDtoToPostsPage } from "@/features/posts/utils/converters";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import * as cn from "@/features/posts/services/api/const";
import type { PostPreviewDto, PostDetailsDto, PostsPage } from "@/features/posts/models/dtos";
import type { PageDto } from "@/shared/models/dtos";
import type { RootState } from "@/app/store";

import { createTag, baseUrl, transformPaging } from "./utils";
import type * as tp from "./types";

const { apiPostsResource } = appConfig;

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
                let url = apiPostsResource;

                if (authorId) {
                    url = `users/${authorId}/${apiPostsResource}`; // TODO get "users" from env var resource?
                }

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
        // getAllPosts: builder.query<PostsPage, tp.GetAllPostsArg | void>({
        //     query: (arg) => {
        //         const { userId } = arg?.filter ?? {};
        //         let url = apiPostsResource;
        //
        //         if (userId) {
        //             url = `users/${userId}/${apiPostsResource}`
        //         }
        //
        //         return ({
        //             params: { paging: transformPaging(arg?.paging) },
        //             url
        //         })
        //     },
        //     transformResponse: (response: PageDto<PostPreviewDto[]>): Promise<PostsPage>
        //         | PostsPage => fromPageDtoToPostsPage(response),
        //     providesTags: (result) => {
        //         const tag = createTag();
        //
        //         return result
        //             ? [...result.items.map(({ id }) => ({ type: tag.type, id })), tag]
        //             : [tag];
        //     },
        // }),
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
                const { page, size } = selectPagingOptions(getState());
                const { data } = await queryFulfilled;

                if (data) {
                    const updatePostData = () => dispatch(
                        postsApi.util.upsertQueryData("getPostBySlug", data.slug, data),
                    );

                    const updatePostsDataRecipe: Recipe<PostsPage> = (draftPosts) => {
                        const itemIndex = draftPosts.items.findIndex((post) => post.id === id);

                        if (itemIndex >= 0) {
                            draftPosts.items[itemIndex] = data;
                        }
                    };

                    const updatePostsData = () => {
                        const getAllPostsArg: tp.GetAllPostsArg = {
                            paging: { page, size },
                        };

                        dispatch(postsApi.util.updateQueryData(
                            "getAllPosts",
                            getAllPostsArg,
                            updatePostsDataRecipe,
                        ));
                    };

                    const updatePostsByAuthorData = () => {
                        const authorId = data.author.id;

                        const getAllPostsByAuthorArg: tp.GetAllPostsArg = {
                            filter: { authorId },
                            paging: { page, size },
                        };

                        dispatch(postsApi.util.updateQueryData(
                            "getAllPosts",
                            getAllPostsByAuthorArg,
                            updatePostsDataRecipe,
                        ));
                    };

                    updatePostData();
                    updatePostsData();
                    updatePostsByAuthorData();
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
