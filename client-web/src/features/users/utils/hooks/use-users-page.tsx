import { useCallback, useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/users/slice/selectors";
import { setPagingOptions } from "@/features/users/slice";
import { useGetAllUsersQuery } from "@/features/users/services/api";
import { toUserList } from "@/features/users/utils/converters";
import { User } from "@/features/users/models/entities";
import { usePage, type UsePageResult } from "@/shared/utils/hooks/use-page";
import { getQueryParams } from "@/shared/utils/helpers/api";
import { type PagingOptions } from "@/shared/types";
import { type GetAllUsersArg } from "@/features/users/services/api/types";

const getArg = (
    pagingOptions: PagingOptions,
    text?: string,
): GetAllUsersArg => ({
    params: getQueryParams(pagingOptions, text, ["details.name"]),
});

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

    const { pagingOptions, searchText, setTotalElements } = usePage({
        initialPagingOptions,
        setPagingOptions: onSetPagingOptions,
    });

    const arg = getArg(pagingOptions, searchText);
    const { isPending, users } = useUsers({ arg, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        users,
    }), [isPending, pagingOptions, users]);
};
