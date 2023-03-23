import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateUserDto, UserDto } from "js-commons";

import type { SignInDto } from "@/features/users/models/dtos";

import { authBaseUrl as baseUrl } from "./utils";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProfile: builder.query<UserDto, void>({
            query: () => ({
                url: "profile",
            }),
        }),
        signIn: builder.mutation<UserDto, SignInDto>({
            query: (body) => ({
                body,
                method: "POST",
                url: "sign-in",
            }),
        }),
        signOut: builder.mutation<boolean, void>({
            query: () => ({
                method: "POST",
                url: "sign-out",
            }),
        }),
        signUp: builder.mutation<UserDto, CreateUserDto>({
            query: (body) => ({
                body,
                method: "POST",
                url: "sign-up",
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useSignInMutation,
    useSignOutMutation,
    useSignUpMutation,
} = authApi;
