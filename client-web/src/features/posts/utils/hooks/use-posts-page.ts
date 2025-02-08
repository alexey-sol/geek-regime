import { useCallback, useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { usePage } from "@/shared/utils/hooks/use-page";
import { mapGetAllPostsArg } from "@/features/posts/utils/api";
import { type PagingOptions } from "@/shared/types";
import { usePostSearchParams } from "@/features/posts/utils/hooks/use-post-search-params";
import { useGetAllPostsQuery } from "@/features/posts/services/posts-api";
import { toPostPreviewList } from "@/features/posts/utils/converters";

import {
    type UseGetAllPostsResult,
    type UseGelAllPostsArg,
    type UsePostsPageResult,
} from "./types";

const useGetAllPosts = ({
    arg,
    setTotalElements,
}: UseGelAllPostsArg): UseGetAllPostsResult => {
    const selectedFromResult = useGetAllPostsQuery(arg, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetching,
            posts: toPostPreviewList(data?.content ?? []),
            totalElements: data?.totalElements ?? 0,
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

    const postSearchParams = usePostSearchParams();

    const arg = mapGetAllPostsArg({
        ...pagingOptions,
        ...postSearchParams,
    });

    const { isPending, posts } = useGetAllPosts({ arg, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
