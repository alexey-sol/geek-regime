import { resources } from "@eggziom/geek-regime-js-commons";

import { type UserPageResponse, type UserResponse } from "@/features/users/models/dtos";
import { appApi } from "@/app/store/api";

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
            providesTags: (result) => {
                const tag = createTag();

                return result
                    ? [...result.content.map(({ id }) => ({ type: tag.type, id })), tag]
                    : [tag];
            },
        }),
        getUserBySlug: builder.query<UserResponse, tp.GetUserBySlugArg>({
            query: (slug) => `/v1/${USERS}/${slug}`,
            providesTags: (result, error, id) => [createTag(id)],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserBySlugQuery,
} = usersApi;
