import { useCallback, useEffect, useMemo } from "react";

import { useAppDispatch } from "@/app/store/hooks";
import {
    authApi,
    useGetProfileQuery,
    useSignInMutation,
    useSignOutMutation,
    useSignUpMutation,
} from "@/features/auth/services/api";
import { fromUserDetailsDtoToEntity } from "@/features/users/utils/converters";
import type { UserDetails } from "@/features/users/models/entities";
import type { SignInDto, SignUpDto } from "@/features/users/models/dtos";

export type UseAuthApiResult = {
    isPending: boolean;
    profile?: UserDetails;
    signIn: (arg: SignInDto) => void;
    signOut: () => void;
    signUp: (arg: SignUpDto) => void;
};

export const useAuthApi = (): UseAuthApiResult => {
    const dispatch = useAppDispatch();
    const resetAuthState = useCallback(() => dispatch(authApi.util.resetApiState()), [dispatch]);

    const getProfileResult = useGetProfileQuery(undefined, {
        selectFromResult: ({ data, error, isFetching }) => ({
            error,
            isFetching,
            profile: data && fromUserDetailsDtoToEntity(data),
        }),
    });

    const [signIn, signInResult] = useSignInMutation({
        selectFromResult: ({ data, error, isLoading }) => ({
            error,
            isLoading,
            profile: data && fromUserDetailsDtoToEntity(data),
        }),
    });

    const [signOut, signOutResult] = useSignOutMutation();

    const [signUp, signUpResult] = useSignUpMutation({
        selectFromResult: ({ data, error, isLoading }) => ({
            error,
            isLoading,
            profile: data && fromUserDetailsDtoToEntity(data),
        }),
    });

    const isPending = getProfileResult.isFetching
        || signInResult.isLoading
        || signOutResult.isLoading
        || signUpResult.isLoading;

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
        isPending,
        profile,
        signIn,
        signOut,
        signUp,
    }), [isPending, profile, signIn, signOut, signUp]);
};
