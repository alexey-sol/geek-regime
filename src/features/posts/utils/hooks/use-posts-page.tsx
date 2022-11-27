import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";

import type { Post } from "@/features/posts/models/entities";
import type { PagingOptions } from "@/shared/types/models";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { defaults } from "@/shared/const";
import { GetAllPostsArg } from "@/features/posts/services/api/types";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";

const usePagingOptions = () => {
    const params = useParams();

    const defaultPagingOptions = useAppSelector(getPagingOptions);

    const dispatch = useAppDispatch();
    const onSetPagingOptions = useCallback((options: Partial<PagingOptions>) => {
        dispatch(setPagingOptions(options));
    }, [dispatch]);

    const setTotalItems = useCallback((newTotalItems: number) =>
        onSetPagingOptions({ totalItems: newTotalItems }), [onSetPagingOptions]);

    const page = params.page
        ? +params.page
        : defaults.PAGING_PAGE;

    const pagingOptions = useMemo(() =>
        ({ ...defaultPagingOptions, page }), [defaultPagingOptions, page]);

    useEffect(() => {
        onSetPagingOptions({ page });
    }, [onSetPagingOptions, page]);

    return useMemo(() => ({
        pagingOptions,
        setTotalItems,
    }), [pagingOptions, setTotalItems]);
};

type UsePostsApiArg = Omit<ReturnType<typeof usePagingOptions>, "setPage">;

const usePostsApi = ({ pagingOptions, setTotalItems }: UsePostsApiArg) => {
    const { page, size } = pagingOptions;

    const pagingArg: GetAllPostsArg = useMemo(() => ({ page, size }), [page, size]);
    const { data, isFetching } = useGetAllPostsQuery(pagingArg);

    const totalItems = data?.options.totalItems ?? pagingOptions.totalItems;
    const postDtoList = useMemo(() => data?.items ?? [], [data?.items]);

    useEffect(() => {
        setTotalItems(totalItems);
    }, [totalItems, setTotalItems]);

    const posts = useMemo(() => {
        const hasPosts = Object.keys(postDtoList).length > 0;

        return (hasPosts)
            ? postDtoList.map((postDto) => fromPostDtoToEntity(postDto))
            : [];
    }, [postDtoList]);

    return {
        isPending: isFetching,
        posts,
    };
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
        posts,
        pagingOptions,
    }), [isPending, pagingOptions, posts]);
};
