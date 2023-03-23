import { useMemo } from "react";
import { useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";

import {
    useGetUserBySlugQuery,
} from "@/features/users/services/api";
import { fromUserDtoToEntity } from "@/features/users/utils/converters";

import type { ActiveUserPending, UseActiveUserResult } from "./types";

export const useActiveUser = (): UseActiveUserResult => {
    const { slug } = useParams();

    const selectedFromGet = useGetUserBySlugQuery(slug ?? skipToken, {
        selectFromResult: ({ isFetching, data }) => ({
            isFetching,
            user: data && fromUserDtoToEntity(data),
        }),
    });

    const { isFetching, user } = selectedFromGet;

    const pending = useMemo<ActiveUserPending | undefined>(() => {
        if (isFetching) {
            return "get";
        }

        return undefined;
    }, [isFetching]);

    return useMemo(() => ({
        pending,
        user,
    }), [pending, user]);
};
