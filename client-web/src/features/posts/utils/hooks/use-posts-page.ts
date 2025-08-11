import { useCallback, useEffect } from "react";

import {
    type UseGetAllPostsResult,
    type UseGetAllPostsArg,
    type UsePostsPageResult,
} from "./types";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/posts/selectors";
import { setPagingOptions } from "@/features/posts/slice/posts";
import { usePage } from "@/shared/utils/hooks/use-page";
import { mapGetAllPostsArg } from "@/features/posts/utils/api";
import { type PagingOptions } from "@/shared/types";
import { usePageSearchParams } from "@/shared/utils/hooks/use-page-search-params";
import { useGetAllPostsQuery } from "@/features/posts/services/posts-api";
import { toPostPreviewList } from "@/features/posts/utils/converters";

const useGetAllPosts = ({
    arg,
    setTotalElements,
}: UseGetAllPostsArg): UseGetAllPostsResult => {
    const { isPending, items, totalElements } = useGetAllPostsQuery(arg, {
        selectFromResult: ({ data, isFetching }) => ({
            isPending: isFetching,
            items: toPostPreviewList(data?.content ?? []),
            totalElements: data?.totalElements ?? 0,
        }),
    });

    useEffect(() => {
        setTotalElements(totalElements);
    }, [totalElements, setTotalElements]);

    return { isPending, items };
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

    const searchParams = usePageSearchParams();

    const arg = mapGetAllPostsArg({
        ...pagingOptions,
        ...searchParams,
    });

    const { isPending, items } = useGetAllPosts({ arg, setTotalElements });

    return { isPending, items, pagingOptions };
};
