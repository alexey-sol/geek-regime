import { useParams } from "react-router";
import { defaults } from "@/shared/const";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Post } from "@/features/posts/models/entities";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";

export const useOptions = () => {
    const params = useParams();

    const resultPage = params.page
        ? +params.page
        : defaults.PAGING_PAGE;

    const [options, setOptions] = useState({
        page: resultPage,
        size: defaults.PAGING_SIZE,
        totalSize: 0,
    });

    const setPage = useCallback((newPage: number) =>
        setOptions((oldOptions) => ({
            ...oldOptions,
            page: newPage,
        })), []);

    const setTotalSize = useCallback((newTotalSize: number) =>
        setOptions((oldOptions) => ({
            ...oldOptions,
            totalSize: newTotalSize,
        })), []);

    return {
        options,
        setPage,
        setTotalSize,
    };
};

const initialItems: Post[] = [];

type UseItemsArg = Omit<
    ReturnType<typeof useOptions>,
    "setPage"
>;

export const useItems = ({ options, setTotalSize }: UseItemsArg) => {
    const [items, setItems] = useState(initialItems);

    const { data, isLoading } = useGetAllPostsQuery({
        page: options.page,
        size: options.size,
    });

    const resultTotalSize = data?.options.totalSize ?? options.totalSize;
    const postDtoList = useMemo(() => data?.items ?? [], [data?.items]);

    // TODO test how getAllPosts cache will behave with this
    const removeItem = useCallback((id: Post["id"]) => {
        setItems((oldItems) =>
            oldItems.filter((post) => post.id !== id));
    }, []);

    useEffect(() => {
        setTotalSize(resultTotalSize);
    }, [resultTotalSize, setTotalSize]);

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
