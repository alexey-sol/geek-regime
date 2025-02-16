import { useCallback, useEffect, useMemo } from "react";
import httpStatus from "http-status";

import { useAppDispatch } from "@/app/store/hooks";
import {
    authApi,
    useGetProfileQuery,
    useSignInMutation,
    useSignOutMutation,
    useSignUpMutation,
} from "@/features/auth/services/api";
import { toUser } from "@/features/users/utils/converters";
import { type User } from "@/features/users/models/entities";
import { type AuthenticateRequest, type CreateUserRequest } from "@/features/users/models/dtos";
import { type HasUnwrap } from "@/shared/types";

export type AuthPending = "get-profile" | "sign-in" | "sign-up" | "sign-out";

export type UseAuthApiResult = {
    pending?: AuthPending;
    profile?: User;
    signIn: (arg: AuthenticateRequest) => HasUnwrap;
    signOut: () => HasUnwrap;
    signUp: (arg: CreateUserRequest) => HasUnwrap;
};

export const useAuthApi = (): UseAuthApiResult => {
    const dispatch = useAppDispatch();
    const resetAuthState = useCallback(() => dispatch(authApi.util.resetApiState()), [dispatch]);

    const getProfileResult = useGetProfileQuery({
        disableFailureNotificationOnStatus: httpStatus.UNAUTHORIZED,
    }, {
        selectFromResult: ({ data, error, isFetching }) => ({
            error,
            isFetching,
            profile: data && toUser(data),
        }),
    });

    const [signIn, signInResult] = useSignInMutation({
        selectFromResult: ({ data, error, isLoading }) => ({
            error,
            isLoading,
            profile: data && toUser(data),
        }),
    });

    const [signOut, signOutResult] = useSignOutMutation();

    const [signUp, signUpResult] = useSignUpMutation({
        selectFromResult: ({ data, error, isLoading }) => ({
            error,
            isLoading,
            profile: data && toUser(data),
        }),
    });

    const pending = useMemo<AuthPending | undefined>(() => {
        if (getProfileResult.isFetching) {
            return "get-profile";
        } else if (signInResult.isLoading) {
            return "sign-in";
        } else if (signUpResult.isLoading) {
            return "sign-up";
        } else if (signOutResult.isLoading) {
            return "sign-out";
        }

        return undefined;
    }, [getProfileResult.isFetching, signInResult.isLoading, signOutResult.isLoading,
        signUpResult.isLoading]);

    useEffect(() => {
        const signedOut = Boolean(signOutResult.data);

        if (signedOut) {
            resetAuthState();
        }
    }, [resetAuthState, signOutResult.data]);

    const profile = useMemo(
        () => getProfileResult.profile ?? signInResult.profile ?? signUpResult.profile,
        [getProfileResult.profile, signInResult.profile, signUpResult.profile],
    );

    return useMemo(() => ({
        pending,
        profile,
        signIn,
        signOut,
        signUp,
    }), [pending, profile, signIn, signOut, signUp]);
};
