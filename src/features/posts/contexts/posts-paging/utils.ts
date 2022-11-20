import { useParams } from "react-router";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { defaults } from "@/shared/const";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import type { Post } from "@/features/posts/models/entities";

export const useOptions = () => {
    const params = useParams();

    const resultPage = params.page
        ? +params.page
        : defaults.PAGING_PAGE;

    const [options, setOptions] = useState({
        page: resultPage,
        size: defaults.PAGING_SIZE,
        totalItems: 0,
    });

    const setPage = useCallback((newPage: number) =>
        setOptions((oldOptions) => ({
            ...oldOptions,
            page: newPage,
        })), []);

    const setTotalItems = useCallback((newTotalItems: number) =>
        setOptions((oldOptions) => ({
            ...oldOptions,
            totalItems: newTotalItems,
        })), []);

    return {
        options,
        setPage,
        setTotalItems,
    };
};

const initialItems: Post[] = [];

type UseItemsArg = Omit<
    ReturnType<typeof useOptions>,
    "setPage"
>;

export const useItems = ({ options, setTotalItems }: UseItemsArg) => {
    const [items, setItems] = useState(initialItems);

    const { data, isLoading } = useGetAllPostsQuery({
        page: options.page,
        size: options.size,
    });

    const resultTotalSize = data?.options.totalItems ?? options.totalItems;
    const postDtoList = useMemo(() => data?.items ?? [], [data?.items]);

    // TODO test how getAllPosts cache will behave with this
    const removeItem = useCallback((id: Post["id"]) => {
        setItems((oldItems) =>
            oldItems.filter((post) => post.id !== id));
    }, []);

    useEffect(() => {
        setTotalItems(resultTotalSize);
    }, [resultTotalSize, setTotalItems]);

    useEffect(() => {
        const hasItems = Object.keys(postDtoList).length > 0;

        if (hasItems) {
            const posts = postDtoList.map((postDto) => fromPostDtoToEntity(postDto));
            setItems(posts);
        }
    }, [postDtoList]);

    return {
        isLoading,
        items,
        removeItem,
    };
};
