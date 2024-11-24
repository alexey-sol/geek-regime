import { useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { usePage } from "@/shared/utils/hooks/use-page";
import { normalizeGetAllPostsArg } from "@/features/posts/utils/api";
import { type PagingOptions } from "@/shared/types";

import { usePosts } from "./use-posts";
import { type UsePostsPageArg, type UsePostsPageResult } from "./types";

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

    const arg = normalizeGetAllPostsArg({ ...pagingOptions, filter, text: searchText });
    const { isPending, posts } = usePosts({ arg, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
