import { resources } from "@eggziom/geek-regime-js-commons";

import type {
    AuthenticateRequest, CreateUserRequest, UserResponse,
} from "@/features/users/models/dtos";
import { appApi } from "@/app/store/api";

import { createTag } from "./utils";
import * as tp from "./types";
import * as cn from "./const";

const { AUTH } = resources;

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
        signIn: builder.mutation<UserResponse, AuthenticateRequest>({
            query: (body) => ({
                body,
                method: "POST",
                url: `/v1/${AUTH}/sign-in`,
            }),
        }),
        signOut: builder.mutation<boolean, void>({
            query: () => ({
                method: "POST",
                url: `/v1/${AUTH}/sign-out`,
            }),
        }),
        signUp: builder.mutation<UserResponse, CreateUserRequest>({
            query: (body) => ({
                body,
                method: "POST",
                url: `/v1/${AUTH}/sign-up`,
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
