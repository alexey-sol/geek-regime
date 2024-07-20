import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { UserPageResponse, UserResponse } from "@/features/users/models/dtos";
import { transformPagingParams } from "@/shared/utils/converters";

import {
    createTag,
    usersBaseUrl as baseUrl,
} from "./utils";
import * as cn from "./const";
import type * as tp from "./types";

export const usersApi = createApi({
    reducerPath: "usersApi",
    tagTypes: [cn.USERS_TAG_TYPE],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserPageResponse, tp.GetAllUsersArg | void>({
            query: (arg) => ({
                params: transformPagingParams(arg?.paging),
                url: "",
            }),
            providesTags: (result) => {
                const tag = createTag();

                return result
                    ? [...result.content.map(({ id }) => ({ type: tag.type, id })), tag]
                    : [tag];
            },
        }),
        getUserBySlug: builder.query<UserResponse, tp.GetUserBySlugArg>({
            query: (slug) => slug,
            providesTags: (result, error, id) => [createTag(id)],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserBySlugQuery,
} = usersApi;
