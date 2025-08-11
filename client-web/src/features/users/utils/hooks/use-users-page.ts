import { useCallback, useEffect, useMemo } from "react";

import { toUserList } from "../converters";
import { mapGetAllUsersArg } from "../api";

import { useUserSearchParams } from "./use-user-search-params";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/users/slice/selectors";
import { setPagingOptions } from "@/features/users/slice";
import { useGetAllUsersQuery } from "@/features/users/services/api";
import { type User } from "@/features/users/models/entities";
import { usePage, type UsePageResult } from "@/shared/utils/hooks/use-page";
import { type PagingOptions } from "@/shared/types";
import { type GetAllUsersArg } from "@/features/users/services/api/types";

type UseUsersArg = Pick<UsePageResult, "setTotalElements"> & {
    arg: GetAllUsersArg;
};

const useUsers = ({ arg, setTotalElements }: UseUsersArg) => {
    const selectedFromResult = useGetAllUsersQuery(arg, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetching,
            users: toUserList(data?.content ?? []),
            totalElements: data?.totalElements ?? 0,
        }),
    });

    const { isFetching, totalElements, users } = selectedFromResult;

    useEffect(() => {
        setTotalElements(totalElements);
    }, [totalElements, setTotalElements]);

    return useMemo(() => ({
        isPending: isFetching,
        users,
    }), [isFetching, users]);
};

type UseUsersPageResult = {
    isPending: boolean;
    pagingOptions: PagingOptions;
    users: User[];
};

export const useUsersPage = (): UseUsersPageResult => {
    const initialPagingOptions = useAppSelector(selectPagingOptions);

    const dispatch = useAppDispatch();
    const onSetPagingOptions = useCallback((options: Partial<PagingOptions>) => {
        dispatch(setPagingOptions(options));
    }, [dispatch]);

    const { pagingOptions, setTotalElements } = usePage({
        initialPagingOptions,
        setPagingOptions: onSetPagingOptions,
    });

    const arg = mapGetAllUsersArg({ ...pagingOptions, ...useUserSearchParams() });
    const { isPending, users } = useUsers({ arg, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        users,
    }), [isPending, pagingOptions, users]);
};
