import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

import { type ActiveUserErrors, type ActiveUserLoading, type UseActiveUserResult } from "./types";

import { useGetUserBySlugQuery } from "@/features/users/services/api";
import { toUser } from "@/features/users/utils/converters";
import { omitUndefined } from "@/shared/utils/helpers/object";
import { getApiErrorIfPossible } from "@/shared/utils/api";

export const useActiveUser = (): UseActiveUserResult => {
    const { slug } = useParams();

    const resultOnGet = useGetUserBySlugQuery(slug ?? skipToken, {
        selectFromResult: ({ data, error, isLoading }) => ({
            error,
            isLoading,
            user: data && toUser(data),
        }),
    });

    const { user } = resultOnGet;

    const loading = useMemo<ActiveUserLoading | undefined>(() => {
        if (resultOnGet.isLoading) {
            return "get";
        }

        return undefined;
    }, [resultOnGet.isLoading]);

    const errors = useMemo<ActiveUserErrors>(() => omitUndefined({
        get: getApiErrorIfPossible(resultOnGet.error),
    }), [resultOnGet.error]);

    return useMemo(() => ({
        errors,
        loading,
        user,
    }), [errors, loading, user]);
};
