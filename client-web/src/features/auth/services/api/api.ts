import { resources } from "@eggziom/geek-regime-js-commons";

import {
    AuthenticateRequest, CreateEmailConfirmationRequest, CreateUserRequest, UserResponse,
} from "@/features/users/models/dtos";
import { appApi } from "@/app/store/api";

import { createTag, transformAuthResponse } from "./utils";
import * as tp from "./types";
import * as cn from "./const";

const { AUTH, CONFIRMATION } = resources;

const appApiWithTag = appApi.enhanceEndpoints({
    addTagTypes: [cn.PROFILE_TYPE],
});

export const authApi = appApiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<UserResponse, tp.GetProfileArg | void>({
            query: () => ({
                url: `/v1/${AUTH}/profile`,
            }),
            providesTags: () => [createTag()],
        }),
        signIn: builder.mutation<tp.AuthResponse, AuthenticateRequest>({
            query: (body) => ({
                body,
                method: "POST",
                url: `/v1/${AUTH}/sign-in`,
            }),
            transformResponse: transformAuthResponse,
        }),
        signOut: builder.mutation<boolean, void>({
            query: () => ({
                method: "POST",
                url: `/v1/${AUTH}/sign-out`,
            }),
        }),
        signUp: builder.mutation<tp.AuthResponse, CreateUserRequest>({
            query: (body) => ({
                body,
                method: "POST",
                url: `/v1/${AUTH}/sign-up`,
            }),
            transformResponse: transformAuthResponse,
        }),
        resendEmailConfirmation: builder.query<void, CreateEmailConfirmationRequest>({
            query: (params) => ({
                url: `/v1/${CONFIRMATION}/email/resend`,
                params: new URLSearchParams(params),
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useLazyResendEmailConfirmationQuery,
    useSignInMutation,
    useSignOutMutation,
    useSignUpMutation,
} = authApi;
