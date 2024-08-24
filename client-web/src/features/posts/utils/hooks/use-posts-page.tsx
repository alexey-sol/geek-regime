import { useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { usePage } from "@/shared/utils/hooks/use-page";
import { type PagingOptions } from "@/shared/types";
import { type GetAllPostsArg } from "@/features/posts/services/api/types";
import { getQueryParams } from "@/shared/utils/helpers/api";

import { usePosts } from "./use-posts";
import { type UsePostsPageArg, type UsePostsPageResult } from "./types";

const getArg = (
    pagingOptions: PagingOptions,
    filter: UsePostsPageArg["filter"],
    text?: string,
): GetAllPostsArg => {
    const arg: GetAllPostsArg = {
        params: getQueryParams(pagingOptions, text, ["title", "body"]),
    };

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

    const { pagingOptions, searchText, setTotalElements } = usePage({
        initialPagingOptions,
        setPagingOptions: onSetPagingOptions,
    });

    const arg = getArg(pagingOptions, filter, searchText);
    const { isPending, posts } = usePosts({ arg, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
