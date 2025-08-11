import { useCallback, useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";

import {
    type UsePostsBySpaceArg,
    type UsePostsBySpacePageResult,
    type UsePostsBySpaceResult,
    type UseSpaceResult,
} from "./types";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/posts/selectors";
import { setPagingOptions } from "@/features/posts/slice/posts";
import { usePage } from "@/shared/utils/hooks/use-page";
import { mapGetAllPostsBySpaceArg } from "@/features/posts/utils/api";
import { type PagingOptions } from "@/shared/types";
import { usePageSearchParams } from "@/shared/utils/hooks/use-page-search-params";
import { useGetAllPostsBySpaceQuery } from "@/features/posts/services/posts-api";
import { toPostPreviewList } from "@/features/posts/utils/converters";
import { useGetSpaceBySlugQuery } from "@/features/spaces/services/api";
import { toSpace } from "@/features/spaces/utils/converters";

export const useSpace = (): UseSpaceResult => {
    const { slug } = useParams();

    const { isPending, space } = useGetSpaceBySlugQuery(slug ?? skipToken, {
        selectFromResult: ({ data, isFetching }) => ({
            isPending: isFetching,
            space: data && toSpace(data),
        }),
    });

    return { isPending, space };
};

export const usePostsBySpace = ({
    arg,
    setTotalElements,
}: UsePostsBySpaceArg): UsePostsBySpaceResult => {
    const { isPending, items, totalElements } = useGetAllPostsBySpaceQuery(arg ?? skipToken, {
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

export const usePostsBySpacePage = (): UsePostsBySpacePageResult => {
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

    const { isPending: isFetchingSpace, space } = useSpace();

    const arg = space
        ? mapGetAllPostsBySpaceArg({
            ...pagingOptions,
            ...searchParams,
            spaceId: space.id,
        })
        : undefined;

    const { isPending: isFetchingPosts, items } = usePostsBySpace({
        arg,
        setTotalElements,
    });

    return {
        isPending: isFetchingSpace || isFetchingPosts,
        pagingOptions,
        items,
        space,
    };
};
