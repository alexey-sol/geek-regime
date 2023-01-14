import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { UserDetailsDto } from "@/features/users/models/dtos";

import { authBaseUrl as baseUrl } from "./utils";
import type * as tp from "./types";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProfile: builder.query<UserDetailsDto, undefined>({
            query: () => ({
                url: "profile",
            }),
        }),
        signIn: builder.mutation<UserDetailsDto, tp.SignInArg>({
            query: (body) => ({
                body,
                method: "POST",
                url: "sign-in",
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useSignInMutation,
} = authApi;
