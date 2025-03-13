import { useMemo } from "react";
import { useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetUserBySlugQuery } from "@/features/users/services/api";
import { toUser } from "@/features/users/utils/converters";
import { omitUndefined } from "@/shared/utils/helpers/object";
import { getApiErrorIfPossible } from "@/shared/utils/api";

import { type ActiveUserErrors, type ActiveUserPending, type UseActiveUserResult } from "./types";

export const useActiveUser = (): UseActiveUserResult => {
    const { slug } = useParams();

    const resultOnGet = useGetUserBySlugQuery(slug ?? skipToken, {
        selectFromResult: ({ data, error, isFetching }) => ({
            error,
            isFetching,
            user: data && toUser(data),
        }),
    });

    const { user } = resultOnGet;

    const pending = useMemo<ActiveUserPending | undefined>(() => {
        if (resultOnGet.isFetching) {
            return "get";
        }

        return undefined;
    }, [resultOnGet.isFetching]);

    const errors = useMemo<ActiveUserErrors>(() => omitUndefined({
        get: getApiErrorIfPossible(resultOnGet.error),
    }), [resultOnGet.error]);

    return useMemo(() => ({
        errors,
        pending,
        user,
    }), [errors, pending, user]);
};
