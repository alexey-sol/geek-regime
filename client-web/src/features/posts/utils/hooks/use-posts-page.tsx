import { useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { usePage } from "@/shared/utils/hooks/use-page";
import type { PagingOptions } from "@/shared/types";
import type { GetAllPostsArg } from "@/features/posts/services/api/types";

import { usePosts } from "./use-posts";
import type { UsePostsPageArg, UsePostsPageResult } from "./types";

const getArg = (
    pagingOptions: PagingOptions,
    filter: UsePostsPageArg["filter"],
): GetAllPostsArg => {
    const { page, size } = pagingOptions;
    const arg: GetAllPostsArg = { paging: { page, size } };

    if (filter) {
        arg.filter = filter;
    }

    return arg;
};

export const usePostsPage = ({ filter }: UsePostsPageArg = {}): UsePostsPageResult => {
    const initialPagingOptions = useAppSelector(selectPagingOptions);

    const dispatch = useAppDispatch();
    const onSetPagingOptions = useCallback((options: Partial<PagingOptions>) => {
        dispatch(setPagingOptions(options));
    }, [dispatch]);

    const { pagingOptions, setTotalElements } = usePage({
        initialPagingOptions,
        setPagingOptions: onSetPagingOptions,
    });

    const arg = getArg(pagingOptions, filter);
    const { isPending, posts } = usePosts({ arg, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
