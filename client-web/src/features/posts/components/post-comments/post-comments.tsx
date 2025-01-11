import React, {
    type FC, memo, useCallback, useMemo, useState,
} from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { LinkButton, Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { useGetAllRootPostCommentsQuery } from "@/features/posts/services/post-comments-api";
import { defaults } from "@/shared/const";
import { normalizeGetAllPostCommentsArg } from "@/features/posts/utils/api";
import { useInfiniteScroll } from "@/shared/utils/hooks/use-infinite-scroll";
import { hasMore } from "@/shared/utils/api";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { type PostCommentResponse } from "@/features/posts/models/dtos";
import { toPostCommentList } from "@/features/posts/utils/converters";
import { RootCommentContextProvider } from "@/features/posts/contexts/root-comment";

import { useReplyBox } from "../reply-box";

import { CommentListStyled, PostCommentsHeaderStyled, PostCommentsStyled } from "./style";
import { ParentComment } from "./parent-comment";

const DEFAULT_POST_COMMENTS: PostCommentResponse[] = [];

export const PostComments: FC = memo(() => {
    const [page, setPage] = useState(defaults.START_PAGE);

    const { t } = useTranslation();
    const { post } = useActivePost();

    const arg = post && normalizeGetAllPostCommentsArg({
        postId: post.id,
        params: { page },
    });

    const result = useGetAllRootPostCommentsQuery(arg ?? skipToken);
    const { content = DEFAULT_POST_COMMENTS } = result.data ?? {};
    const postComments = useMemo(() => toPostCommentList(content), [content]);

    const onLoadMore = useCallback(() => {
        setPage(page + 1);
    }, [page]);

    const { sentryRef } = useInfiniteScroll<HTMLUListElement>({
        hasMore: hasMore(result),
        onLoadMore,
    });

    const { openReplyBox, replyBoxIfAvailable, showReplyBox } = useReplyBox();

    const openReplyBoxButton = (
        <LinkButton fontSize="xs" onClick={openReplyBox} view="primary">
            {t("posts.post.comments.actions.leaveCommentButton.title")}
        </LinkButton>
    );

    return (
        <PostCommentsStyled>
            <PostCommentsHeaderStyled>
                <Typography as="h3">
                    {`${t("posts.post.comments.title")} `}
                    <Typography color="secondary" weight="bolder" fontSize="sm" as="span">
                        {post?.meta.commentCount}
                    </Typography>
                </Typography>
                {showReplyBox ? replyBoxIfAvailable : openReplyBoxButton}
            </PostCommentsHeaderStyled>
            <CommentListStyled>
                {postComments.map((comment) => (
                    <li key={comment.id}>
                        <RootCommentContextProvider item={comment}>
                            <ParentComment item={comment} />
                        </RootCommentContextProvider>
                    </li>
                ))}
                <section ref={sentryRef} />
            </CommentListStyled>
        </PostCommentsStyled>
    );
});
