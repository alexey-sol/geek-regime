import React, { type FC, memo, useMemo } from "react";
import { Skeleton } from "@eggziom/geek-regime-js-ui-kit/components/loaders";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { useTranslation } from "react-i18next";
import { type HasId } from "@eggziom/geek-regime-js-utils";

import { ParentComment } from "../parent-comment";

import { CommentListStyled, PostCommentsHeaderStyled, PostCommentsStyled } from "./style";
import { usePostComments } from "./utils";

import { type PostCommentResponse } from "@/features/posts/models/dtos";
import { RootCommentContextProvider } from "@/features/posts/contexts/root-comment";
import { getStubItems } from "@/shared/utils/helpers/object";

const DEFAULT_POST_COMMENTS: PostCommentResponse[] = [];

export const PostComments: FC = memo(() => {
    const { t } = useTranslation();

    const {
        commentCount, pending, postComments, replyBoxOrButtonIfAvailable, sentryRef,
    } = usePostComments();

    const itemsOrStubs: HasId[] = useMemo(() => {
        const createItemStubs = pending === "create"
            ? getStubItems(1)
            : DEFAULT_POST_COMMENTS;

        const getListStubs = pending === "getRoots"
            ? getStubItems(3)
            : DEFAULT_POST_COMMENTS;

        return [...createItemStubs, ...postComments, ...getListStubs];
    }, [pending, postComments]);

    return (
        <PostCommentsStyled>
            <PostCommentsHeaderStyled>
                <Skeleton isLoading={pending === "getRoots"} heightPx={22} widthPx={100}>
                    <Typography as="h3">
                        {`${t("posts.post.comments.title")} `}
                        <Typography color="secondary" weight="bolder" fontSize="sm" as="span">
                            {commentCount}
                        </Typography>
                    </Typography>
                </Skeleton>
                {replyBoxOrButtonIfAvailable}
            </PostCommentsHeaderStyled>
            <CommentListStyled>
                {itemsOrStubs.map((comment) => (
                    <li key={comment.id}>
                        <RootCommentContextProvider item={comment}>
                            <ParentComment />
                        </RootCommentContextProvider>
                    </li>
                ))}
                <section ref={sentryRef} />
            </CommentListStyled>
        </PostCommentsStyled>
    );
});
