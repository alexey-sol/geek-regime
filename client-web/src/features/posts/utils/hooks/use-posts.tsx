import { useEffect, useMemo } from "react";

import { toUserPostPreviewList } from "@/features/posts/utils/converters";
import { useGetAllPostsQuery } from "@/features/posts/services/posts-api";
import { type UsePageResult } from "@/shared/utils/hooks/use-page";
import { type GetAllPostsArg } from "@/features/posts/services/posts-api/types";

import { type UsePostsPageResult } from "./types";

type UsePostsArg = Pick<UsePageResult, "setTotalElements"> & {
    arg: GetAllPostsArg;
    skip?: boolean;
};

type UsePostsResult = Pick<UsePostsPageResult, "isPending" | "posts">;

export const usePosts = ({ arg, setTotalElements, skip }: UsePostsArg): UsePostsResult => {
    const selectedFromResult = useGetAllPostsQuery(arg, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetching,
            posts: toUserPostPreviewList(data?.content ?? []),
            totalElements: data?.totalElements ?? 0,
        }),
        skip,
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
