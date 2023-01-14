import React, { useMemo } from "react";

import { useGetProfileQuery, useSignInMutation } from "@/features/auth/services/api";
import { fromUserDetailsDtoToEntity } from "@/features/users/utils/converters";
import { getUseContextOrThrowError } from "@/shared/utils/helpers/context";
import type { HasChildren } from "@/shared/types/props";
import type { SignInArg } from "@/features/auth/services/api/types";
import type { UserDetails } from "@/features/users/models/entities";

type AuthValue = {
    isPending: boolean;
    profile?: UserDetails;
    signIn: (arg: SignInArg) => void;
};

export const AuthContext = React.createContext<AuthValue | null>(null);

export const AuthProvider = ({ children }: HasChildren) => {
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

    const isPending = getProfileResult.isFetching || signInResult.isLoading;

    const profile = useMemo(
        () => getProfileResult.profile ?? signInResult.profile,
        [getProfileResult.profile, signInResult.profile],
    );

    const value = useMemo(() => ({
        isPending,
        profile,
        signIn,
    }), [isPending, profile, signIn]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = getUseContextOrThrowError<AuthValue>(AuthContext);
