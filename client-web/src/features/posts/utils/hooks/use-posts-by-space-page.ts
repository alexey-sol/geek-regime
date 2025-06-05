import { useCallback, useEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { usePage } from "@/shared/utils/hooks/use-page";
import { mapGetAllPostsBySpaceArg } from "@/features/posts/utils/api";
import { type PagingOptions } from "@/shared/types";
import { usePostSearchParams } from "@/features/posts/utils/hooks/use-post-search-params";
import { useGetAllPostsBySpaceQuery } from "@/features/posts/services/posts-api";
import { toPostPreviewList } from "@/features/posts/utils/converters";
import { useGetSpaceBySlugQuery } from "@/features/spaces/services/api";
import { toSpace } from "@/features/spaces/utils/converters";

import {
    type UsePostsBySpaceResult,
    type UsePostsBySpaceArg,
    type UsePostsPageResult,
    type UseSpaceResult,
} from "./types";

export const useSpace = (): UseSpaceResult => {
    const { slug } = useParams();

    const { isFetchingSpace, space } = useGetSpaceBySlugQuery(slug ?? skipToken, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetchingSpace: isFetching,
            space: data && toSpace(data),
        }),
    });

    return useMemo(() => ({
        isFetchingSpace,
        space,
    }), [isFetchingSpace, space]);
};

export const usePostsBySpace = ({
    arg,
    setTotalElements,
}: UsePostsBySpaceArg): UsePostsBySpaceResult => {
    const { isFetchingPosts, posts, totalElements } = useGetAllPostsBySpaceQuery(arg ?? skipToken, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetchingPosts: isFetching,
            posts: toPostPreviewList(data?.content ?? []),
            totalElements: data?.totalElements ?? 0,
        }),
    });

    useEffect(() => {
        setTotalElements(totalElements);
    }, [totalElements, setTotalElements]);

    return useMemo(() => ({
        isFetchingPosts,
        posts,
    }), [isFetchingPosts, posts]);
};

export const usePostsBySpacePage = (): UsePostsPageResult => {
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

    const { isFetchingSpace, space } = useSpace();

    const arg = space
        ? mapGetAllPostsBySpaceArg({
            ...pagingOptions,
            ...postSearchParams,
            spaceId: space.id,
        })
        : undefined;

    const { isFetchingPosts, posts } = usePostsBySpace({
        arg,
        setTotalElements,
    });

    return useMemo(() => ({
        isPending: isFetchingSpace || isFetchingPosts,
        pagingOptions,
        posts,
        space,
    }), [isFetchingPosts, isFetchingSpace, pagingOptions, posts, space]);
};
