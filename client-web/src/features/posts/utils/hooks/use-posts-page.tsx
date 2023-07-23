import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";
import { setPagingOptions } from "@/features/posts/slice";
import { fromPostPreviewDtoListToEntities } from "@/features/posts/utils/converters";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { defaults } from "@/shared/const";
import type { PagingOptions } from "@/shared/models/entities";
import type { PostPreview } from "@/features/posts/models/entities";
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

const usePosts = ({ pagingOptions, setTotalItems }: UsePostsApiArg) => {
    const { page, size } = pagingOptions;

    const getAllPostsArg: GetAllPostsArg = useMemo(() => ({ paging: { page, size } }), [page, size]); // TODO
    const selectedFromResult = useGetAllPostsQuery(getAllPostsArg, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetching,
            posts: fromPostPreviewDtoListToEntities(data?.items ?? []),
            totalItems: data?.options.totalItems ?? pagingOptions.totalItems,
        }),
    });

    const { isFetching, posts, totalItems } = selectedFromResult;

    useEffect(() => {
        setTotalItems(totalItems);
    }, [totalItems, setTotalItems]);

    return useMemo(() => ({
        isPending: isFetching,
        posts,
    }), [isFetching, posts]);
};

type UsePostsPageResult = {
    isPending: boolean;
    pagingOptions: PagingOptions;
    posts: PostPreview[];
};

export const usePostsPage = (): UsePostsPageResult => {
    const { pagingOptions, setTotalItems } = usePagingOptions();
    const { isPending, posts } = usePosts({ pagingOptions, setTotalItems });

    return useMemo(() => ({
        isPending,
        pagingOptions,
        posts,
    }), [isPending, pagingOptions, posts]);
};
