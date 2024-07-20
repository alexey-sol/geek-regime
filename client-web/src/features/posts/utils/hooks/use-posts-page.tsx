import { useCallback, useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { toUserPostPreviewList } from "@/features/posts/utils/converters";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { usePage, type UsePageResult } from "@/shared/utils/hooks/use-page";
import type { PagingOptions } from "@/shared/types";
import type { UserPostPreview } from "@/features/posts/models/entities";
import type { GetAllPostsArg } from "@/features/posts/services/api/types";

const usePosts = ({ pagingOptions, setTotalElements }: UsePageResult) => {
    const { page, size } = pagingOptions;

    const arg: GetAllPostsArg = useMemo(() => ({ paging: { page, size } }), [page, size]);
    const selectedFromResult = useGetAllPostsQuery(arg, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetching,
            posts: toUserPostPreviewList(data?.content ?? []),
            totalElements: data?.totalElements ?? pagingOptions.totalElements,
        }),
    });

    const { isFetching, posts, totalElements } = selectedFromResult;

    useEffect(() => {
        setTotalElements(totalElements);
    }, [totalElements, setTotalElements]);

    return useMemo(() => ({
        isPending: isFetching,
        posts,
    }), [isFetching, posts]);
};

type UsePostsPageResult = {
    isPending: boolean;
    pagingOptions: PagingOptions;
    posts: UserPostPreview[];
};

export const usePostsPage = (): UsePostsPageResult => {
    const initialPagingOptions = useAppSelector(selectPagingOptions);

    const dispatch = useAppDispatch();
    const onSetPagingOptions = useCallback((options: Partial<PagingOptions>) => {
        dispatch(setPagingOptions(options));
    }, [dispatch]);

    const { pagingOptions, setTotalElements } = usePage({
        initialPagingOptions,
        setPagingOptions: onSetPagingOptions,
    });

    const { isPending, posts } = usePosts({ pagingOptions, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
