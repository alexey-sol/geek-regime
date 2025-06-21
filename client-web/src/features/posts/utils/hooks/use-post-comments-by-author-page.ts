import { useCallback, useEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/post-comments/selectors";
import { setPagingOptions } from "@/features/posts/slice/post-comments";
import { usePage } from "@/shared/utils/hooks/use-page";
import { mapGetProfilePostCommentsArg } from "@/features/posts/utils/api";
import { type PagingOptions } from "@/shared/types";
import { usePageSearchParams } from "@/shared/utils/hooks/use-page-search-params";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { toProfilePostCommentList } from "@/features/posts/utils/converters";
import { useGetPostCommentsByAuthorQuery } from "@/features/posts/services/post-comments-api";
import { useGetAllPostsByIdQuery } from "@/features/posts/services/posts-api";
import { GetAllPostsByIdArg } from "@/features/posts/services/posts-api/types";
import { type PostCommentResponse, type PostPreviewResponse } from "@/features/posts/models/dtos";

import {
    type UsePostCommentsByAuthorResult,
    type UsePostCommentsByAuthorArg,
    type UsePostCommentsPageResult,
} from "./types";

const DEFAULT_POST_COMMENTS: PostCommentResponse[] = [];
const DEFAULT_POST_PREVIEWS: PostPreviewResponse[] = [];

export const usePostCommentsByAuthor = ({
    arg,
    setTotalElements,
}: UsePostCommentsByAuthorArg): UsePostCommentsByAuthorResult => {
    const {
        comments,
        isFetchingComments,
        totalElements,
    } = useGetPostCommentsByAuthorQuery(arg ?? skipToken, {
        selectFromResult: ({ data, isFetching }) => ({
            comments: data?.content ?? DEFAULT_POST_COMMENTS,
            isFetchingComments: isFetching,
            totalElements: data?.totalElements ?? 0,
        }),
    });

    const postIds = comments.map(({ postId }) => postId);

    const getAllPostsByIdArgIfAvailable: GetAllPostsByIdArg | undefined = postIds.length
        ? { ids: postIds }
        : undefined;

    const {
        isFetchingPosts,
        posts,
    } = useGetAllPostsByIdQuery(getAllPostsByIdArgIfAvailable ?? skipToken, {
        selectFromResult: ({ data, isFetching }) => ({
            isFetchingPosts: isFetching,
            posts: data ?? DEFAULT_POST_PREVIEWS,
        }),
    });

    const profileComments = useMemo(() => toProfilePostCommentList(comments, posts), [comments, posts]);

    useEffect(() => {
        setTotalElements(totalElements);
    }, [totalElements, setTotalElements]);

    return {
        items: profileComments,
        isPending: isFetchingComments || isFetchingPosts,
    };
};

export const usePostCommentsByAuthorPage = (): UsePostCommentsPageResult => {
    const { user } = useActiveUser();

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

    const arg = user?.id
        ? mapGetProfilePostCommentsArg({
            ...pagingOptions,
            ...searchParams,
            authorId: user?.id,
        })
        : undefined;

    const { isPending, items } = usePostCommentsByAuthor({
        arg,
        setTotalElements,
    });

    return { isPending, items, pagingOptions };
};
