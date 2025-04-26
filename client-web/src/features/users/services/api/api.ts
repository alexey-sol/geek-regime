import {type HasId, resources} from "@eggziom/geek-regime-js-commons";

import { type UserPageResponse, type UserResponse } from "@/features/users/models/dtos";
import { appApi } from "@/app/store/api";
import { authApi } from "@/features/auth/services/api";
import * as authCn from "@/features/auth/services/api/const";

import { createTag } from "./utils";
import * as cn from "./const";
import type * as tp from "./types";

const { USERS } = resources;

const appApiWithTag = appApi.enhanceEndpoints({
    addTagTypes: [cn.TAG_TYPE],
});

export const usersApi = appApiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserPageResponse, tp.GetAllUsersArg | void>({
            query: (arg) => ({
                params: arg?.params,
                url: `/v1/${USERS}`,
            }),
            providesTags: () => [createTag(cn.TAG_TYPE)],
        }),
        getUserBySlug: builder.query<UserResponse, tp.GetUserBySlugArg>({
            query: (slug) => `/v1/${USERS}/${slug}`,
            providesTags: (result, error, id) => [createTag(id)],
        }),
        updateUserById: builder.mutation<UserResponse, tp.UpdateUserByIdArg>({
            query: ({ id, ...body }) => ({
                body,
                method: "PATCH",
                url: `/v1/${USERS}/${id}`,
            }),
            invalidatesTags: (result) => (result
                ? [createTag(cn.TAG_TYPE), createTag(result.slug)]
                : []),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        dispatch(authApi.util.invalidateTags([authCn.PROFILE_ID]));
                    })
                    .catch(console.error);
            },
        }),
        uploadUserPicture: builder.mutation<UserResponse, tp.UploadUserPictureArg>({
            query: ({ id, formData }) => ({
                body: formData,
                formData: true,
                method: "PUT",
                url: `/v1/${USERS}/${id}/picture`,
            }),
            invalidatesTags: (result) => (result
                ? [createTag(cn.TAG_TYPE), createTag(result.slug)]
                : []),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        dispatch(authApi.util.invalidateTags([authCn.PROFILE_ID]));
                    })
                    .catch(console.error);
            },
        }),
        removeUserPictureByUserId: builder.mutation<UserResponse, HasId>({
            query: ({ id }) => ({
                method: "DELETE",
                url: `/v1/${USERS}/${id}/picture`,
            }),
            invalidatesTags: (result) => (result
                ? [createTag(cn.TAG_TYPE), createTag(result.slug)]
                : []),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        dispatch(authApi.util.invalidateTags([authCn.PROFILE_ID]));
                    })
                    .catch(console.error);
            },
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserBySlugQuery,
    useUpdateUserByIdMutation,
    useUploadUserPictureMutation,
    useRemoveUserPictureByUserIdMutation,
} = usersApi;
