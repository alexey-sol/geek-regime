import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { UserResponse } from "@/features/users/models/dtos";

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
        getUserBySlug: builder.query<UserResponse, tp.GetUserBySlugArg>({
            query: (slug) => slug,
            providesTags: (result, error, id) => [createTag(id)],
        }),
    }),
});

export const {
    useGetUserBySlugQuery,
} = usersApi;
