import { useCallback, useEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { usePage } from "@/shared/utils/hooks/use-page";
import { mapGetAllPostsByAuthorArg } from "@/features/posts/utils/api";
import { type PagingOptions } from "@/shared/types";
import { usePostSearchParams } from "@/features/posts/utils/hooks/use-post-search-params";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { useGetAllPostsByAuthorQuery } from "@/features/posts/services/posts-api";
import { toPostPreviewList } from "@/features/posts/utils/converters";

import {
    type UseGetAllPostsByAuthorResult,
    type UseGetAllPostsByAuthorArg,
    type UsePostsPageResult,
} from "./types";

export const usePostsByAuthor = ({
    arg,
    setTotalElements,
}: UseGetAllPostsByAuthorArg): UseGetAllPostsByAuthorResult => {
    const selectedFromResult = useGetAllPostsByAuthorQuery(arg ?? skipToken, {
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

export const usePostsByAuthorPage = (): UsePostsPageResult => {
    const { user } = useActiveUser();

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

    const arg = user?.id
        ? mapGetAllPostsByAuthorArg({
            ...pagingOptions,
            ...postSearchParams,
            authorId: user?.id,
        })
        : undefined;

    const { isPending, posts } = usePostsByAuthor({
        arg,
        setTotalElements,
    });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
