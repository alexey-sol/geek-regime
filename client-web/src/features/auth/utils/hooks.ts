import { useCallback, useEffect, useMemo } from "react";

import { useAppDispatch } from "@/app/store/hooks";
import {
    authApi,
    useGetProfileQuery,
    useSignInMutation,
    useSignOutMutation,
} from "@/features/auth/services/api/api";
import { fromUserDetailsDtoToEntity } from "@/features/users/utils/converters";
import type { UserDetails } from "@/features/users/models/entities";
import type { SignInArg } from "@/features/auth/services/api/types";

export type UseAuthResult = {
    isPending: boolean;
    profile?: UserDetails;
    signIn: (arg: SignInArg) => void;
    signOut: () => void;
};

export const useAuth = (): UseAuthResult => {
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

    const isPending = getProfileResult.isFetching
        || signInResult.isLoading
        || signOutResult.isLoading;

    useEffect(() => {
        if (signOutResult.data) {
            resetAuthState();
        }
    }, [dispatch, resetAuthState, signInResult, signOutResult.data]);

    const profile = useMemo(
        () => getProfileResult.profile ?? signInResult.profile,
        [getProfileResult.profile, signInResult.profile],
    );

    return useMemo(() => ({
        isPending,
        profile,
        signIn,
        signOut,
    }), [isPending, profile, signIn, signOut]);
};
