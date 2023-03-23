import { useCallback, useEffect, useMemo } from "react";
import type { CreateUserDto } from "js-commons";

import { useAppDispatch } from "@/app/store/hooks";
import {
    authApi,
    useGetProfileQuery,
    useSignInMutation,
    useSignOutMutation,
    useSignUpMutation,
} from "@/features/auth/services/api";
import { fromUserDtoToEntity } from "@/features/users/utils/converters";
import type { User } from "@/features/users/models/entities";
import type { SignInDto } from "@/features/users/models/dtos";

export type AuthPending = "get-profile" | "sign-in" | "sign-up" | "sign-out";

export type UseAuthApiResult = {
    pending?: AuthPending;
    profile?: User;
    signIn: (arg: SignInDto) => void;
    signOut: () => void;
    signUp: (arg: CreateUserDto) => void;
};

export const useAuthApi = (): UseAuthApiResult => {
    const dispatch = useAppDispatch();
    const resetAuthState = useCallback(() => dispatch(authApi.util.resetApiState()), [dispatch]);

    const getProfileResult = useGetProfileQuery(undefined, {
        selectFromResult: ({ data, error, isFetching }) => ({
            error,
            isFetching,
            profile: data && fromUserDtoToEntity(data),
        }),
    });

    const [signIn, signInResult] = useSignInMutation({
        selectFromResult: ({ data, error, isLoading }) => ({
            error,
            isLoading,
            profile: data && fromUserDtoToEntity(data),
        }),
    });

    const [signOut, signOutResult] = useSignOutMutation();

    const [signUp, signUpResult] = useSignUpMutation({
        selectFromResult: ({ data, error, isLoading }) => ({
            error,
            isLoading,
            profile: data && fromUserDtoToEntity(data),
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
