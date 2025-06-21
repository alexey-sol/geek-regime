import { useCallback, useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/posts/selectors";
import { setPagingOptions } from "@/features/posts/slice/posts";
import { usePage } from "@/shared/utils/hooks/use-page";
import { mapGetAllPostsByAuthorArg } from "@/features/posts/utils/api";
import { type PagingOptions } from "@/shared/types";
import { usePageSearchParams } from "@/shared/utils/hooks/use-page-search-params";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { useGetAllPostsByAuthorQuery } from "@/features/posts/services/posts-api";
import { toPostPreviewList } from "@/features/posts/utils/converters";

import {
    type UsePostsPageResult,
    type UsePostsByAuthorArg,
    type UsePostsByAuthorResult,
} from "./types";

export const usePostsByAuthor = ({
    arg,
    setTotalElements,
}: UsePostsByAuthorArg): UsePostsByAuthorResult => {
    const { isPending, items, totalElements } = useGetAllPostsByAuthorQuery(arg ?? skipToken, {
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

    const searchParams = usePageSearchParams();

    const arg = user?.id
        ? mapGetAllPostsByAuthorArg({
            ...pagingOptions,
            ...searchParams,
            authorId: user?.id,
        })
        : undefined;

    const { isPending, items } = usePostsByAuthor({
        arg,
        setTotalElements,
    });

    return { isPending, items, pagingOptions };
};
