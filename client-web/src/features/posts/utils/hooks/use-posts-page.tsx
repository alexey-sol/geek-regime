import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { fromPostDtoListToEntities } from "@/features/posts/utils/converters";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { defaults } from "@/shared/const";
import type { PagingOptions } from "@/shared/models/entities";
import type { Post } from "@/features/posts/models/entities";
import type { GetAllPostsArg } from "@/features/posts/services/api/types";

const usePagingOptions = () => {
    const params = useParams();

    const initialOptions = useAppSelector(selectPagingOptions);

    const dispatch = useAppDispatch();
    const onSetPagingOptions = useCallback((options: Partial<PagingOptions>) => {
        dispatch(setPagingOptions(options));
    }, [dispatch]);

    const setTotalItems = useCallback((newTotalItems: number) =>
        onSetPagingOptions({ totalItems: newTotalItems }), [onSetPagingOptions]);

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
        setTotalItems,
    }), [pagingOptions, setTotalItems]);
};

type UsePostsApiArg = ReturnType<typeof usePagingOptions>;

const usePostsApi = ({ pagingOptions, setTotalItems }: UsePostsApiArg) => {
    const { page, size } = pagingOptions;

    const pagingArg: GetAllPostsArg = useMemo(() => ({ page, size }), [page, size]);
    const { data, isFetching } = useGetAllPostsQuery(pagingArg);

    const totalItems = data?.options.totalItems ?? pagingOptions.totalItems;

    useEffect(() => {
        setTotalItems(totalItems);
    }, [totalItems, setTotalItems]);

    const posts = useMemo(() => fromPostDtoListToEntities(data?.items ?? []), [data?.items]);

    return useMemo(() => ({
        isPending: isFetching,
        posts,
    }), [isFetching, posts]);
};

type UsePostsPageResult = {
    isPending: boolean;
    posts: Post[];
    pagingOptions: PagingOptions;
};

export const usePostsPage = (): UsePostsPageResult => {
    const { pagingOptions, setTotalItems } = usePagingOptions();
    const { isPending, posts } = usePostsApi({ pagingOptions, setTotalItems });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
