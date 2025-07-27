import React, {
    type ReactNode, type RefObject, useCallback, useMemo, useState,
} from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { LinkButton, useInfiniteScroll } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import {
    useCreatePostCommentMutation, useGetAllRootPostCommentsQuery,
} from "@/features/posts/services/post-comments-api";
import { defaults } from "@/shared/const";
import { getCreateCommentKey, mapGetAllPostCommentsArg } from "@/features/posts/utils/api";
import { hasMore } from "@/shared/utils/api";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { type PostCommentResponse } from "@/features/posts/models/dtos";
import { toPostCommentList } from "@/features/posts/utils/converters";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { type PostComment } from "@/features/posts/models/entities";

import { ReplyCommentBox, useCommentBox } from "../comment-box";
import { type PostCommentPending } from "../../types";

const DEFAULT_POST_COMMENTS: PostCommentResponse[] = [];

type UsePostCommentsResult = {
    commentCount: number;
    pending?: Extract<PostCommentPending, "getRoots" | "create">;
    postComments: PostComment[];
    replyBoxOrButtonIfAvailable?: ReactNode;
    sentryRef: RefObject<HTMLUListElement>;
};

export const usePostComments = (): UsePostCommentsResult => {
    const [page, setPage] = useState(defaults.START_PAGE);

    const { t } = useTranslation();
    const { profile } = useAuthContext();
    const { post } = useActivePost();

    const arg = post && mapGetAllPostCommentsArg({
        postId: post.id,
        params: { page },
    });

    const resultOnGet = useGetAllRootPostCommentsQuery(arg ?? skipToken);
    const { content = DEFAULT_POST_COMMENTS } = resultOnGet.data ?? {};
    const postComments = useMemo(() => toPostCommentList(content), [content]);

    const onLoadMore = useCallback(() => {
        setPage(page + 1);
    }, [page]);

    const { sentryRef } = useInfiniteScroll<HTMLUListElement>({
        hasMore: hasMore(resultOnGet),
        onLoadMore,
    });

    const {
        closeBox, onReplySuccess, openReplyBox, showReplyBox,
    } = useCommentBox();

    const openReplyBoxButton = (
        <LinkButton fontSize="xs" onClick={openReplyBox} view="primary">
            {t("shared.actions.leaveComment")}
        </LinkButton>
    );

    const replyBoxOrButton = showReplyBox
        ? <ReplyCommentBox onClose={closeBox} onSubmit={onReplySuccess} />
        : openReplyBoxButton;

    const [, resultOnCreate] = useCreatePostCommentMutation({
        fixedCacheKey: getCreateCommentKey(),
    });

    const pending = useMemo<UsePostCommentsResult["pending"]>(() => {
        if (resultOnGet.isFetching) {
            return "getRoots";
        } else if (resultOnCreate.isLoading) {
            return "create";
        }

        return undefined;
    }, [resultOnCreate.isLoading, resultOnGet.isFetching]);

    return {
        commentCount: post?.meta.commentCount ?? 0,
        pending,
        postComments,
        replyBoxOrButtonIfAvailable: profile && replyBoxOrButton,
        sentryRef,
    };
};
