import React, { ReactNode, useMemo } from "react";
import { getUseContextOrThrowError } from "@/shared/utils/helpers/context";
import { Post } from "@/features/posts/models/entities";
import { PagingOptions } from "@/shared/types/models";
import { useItems, useOptions } from "./posts-paging.utils";

export type PostsPagingValue = {
    isLoading: boolean;
    items: Post[];
    options: PagingOptions;
    removeItem: (id: Post["id"]) => void;
    setPage: (page: number) => void;
};

export const PostsPaging = React.createContext<PostsPagingValue | null>(null);

export const PostsPagingProvider = (
    { children }: { children: ReactNode },
) => {
    const { options, setPage, setTotalSize } = useOptions();
    const { isLoading, items, removeItem } = useItems({ options, setTotalSize });

    const value = useMemo(() => ({
        isLoading,
        items,
        options,
        removeItem,
        setPage,
    }), [isLoading, items, options, removeItem, setPage]);

    return (
        <PostsPaging.Provider value={value}>
            {children}
        </PostsPaging.Provider>
    );
};

export const usePostsPagingContext = getUseContextOrThrowError<PostsPagingValue>(PostsPaging);
