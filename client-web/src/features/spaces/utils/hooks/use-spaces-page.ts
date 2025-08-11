import { useCallback, useEffect, useMemo } from "react";

import {
    type UseGetAllSpacesResult,
    type UseGetAllSpacesArg,
    type UseSpacesPageResult,
} from "./types";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/spaces/slice/selectors";
import { setPagingOptions } from "@/features/spaces/slice";
import { usePage } from "@/shared/utils/hooks/use-page";
import { mapGetAllSpacesArg } from "@/features/spaces/utils/api";
import { type PagingOptions } from "@/shared/types";
import { useSpaceSearchParams } from "@/features/spaces/utils/hooks/use-space-search-params";
import { useGetAllSpacesQuery } from "@/features/spaces/services/api";
import { toSpaceList } from "@/features/spaces/utils/converters";

const useGetAllSpaces = ({
    arg,
    setTotalElements,
}: UseGetAllSpacesArg): UseGetAllSpacesResult => {
    const selectedFromResult = useGetAllSpacesQuery(arg, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetching,
            spaces: toSpaceList(data?.content ?? []),
            totalElements: data?.totalElements ?? 0,
        }),
    });

    const { isFetching, spaces, totalElements } = selectedFromResult;

    useEffect(() => {
        setTotalElements(totalElements);
    }, [totalElements, setTotalElements]);

    return useMemo(() => ({
        isPending: isFetching,
        spaces,
    }), [isFetching, spaces]);
};

export const useSpacesPage = (): UseSpacesPageResult => {
    const initialPagingOptions = useAppSelector(selectPagingOptions);

    const dispatch = useAppDispatch();
    const onSetPagingOptions = useCallback((options: Partial<PagingOptions>) => {
        dispatch(setPagingOptions(options));
    }, [dispatch]);

    const { pagingOptions, setTotalElements } = usePage({
        initialPagingOptions,
        setPagingOptions: onSetPagingOptions,
    });

    const spaceSearchParams = useSpaceSearchParams();

    const arg = mapGetAllSpacesArg({
        ...pagingOptions,
        ...spaceSearchParams,
    });

    const { isPending, spaces } = useGetAllSpaces({ arg, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        spaces,
    }), [isPending, pagingOptions, spaces]);
};
