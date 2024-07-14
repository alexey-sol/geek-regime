import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { toUserPostPreviewList } from "@/features/posts/utils/converters";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { defaults } from "@/shared/const";
import type { PagingOptions } from "@/shared/models/entities";
import type { UserPostPreview } from "@/features/posts/models/entities";
import type { GetAllPostsArg } from "@/features/posts/services/api/types";

const usePagingOptions = () => {
    const params = useParams();

    const initialOptions = useAppSelector(selectPagingOptions);

    const dispatch = useAppDispatch();
    const onSetPagingOptions = useCallback((options: Partial<PagingOptions>) => {
        dispatch(setPagingOptions(options));
    }, [dispatch]);

    const setTotalElements = useCallback((totalElements: number) =>
        onSetPagingOptions({ totalElements }), [onSetPagingOptions]);

    const page = params.page
        ? +params.page
        : defaults.PAGING_PAGE;

    const pagingOptions: PagingOptions = useMemo(() =>
        ({ ...initialOptions, page }), [initialOptions, page]);

    useEffect(() => {
        onSetPagingOptions({ page });
    }, [onSetPagingOptions, page]);

    return useMemo(() => ({
        pagingOptions,
        setTotalElements,
    }), [pagingOptions, setTotalElements]);
};

type UsePostsApiArg = ReturnType<typeof usePagingOptions>;

const usePosts = ({ pagingOptions, setTotalElements }: UsePostsApiArg) => {
    const { page, size } = pagingOptions;

    const getAllPostsArg: GetAllPostsArg = useMemo(() => ({ paging: { page, size } }), [page, size]); // TODO
    const selectedFromResult = useGetAllPostsQuery(getAllPostsArg, {
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
    const { pagingOptions, setTotalElements } = usePagingOptions();
    const { isPending, posts } = usePosts({ pagingOptions, setTotalElements });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
