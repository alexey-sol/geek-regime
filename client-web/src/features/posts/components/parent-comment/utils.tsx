import React, { type ReactNode } from "react";
import { type ButtonProps, LinkButton } from "@eggziom/geek-regime-js-ui-kit/components/button";

import { Comment } from "../comment";

import { CommentBranchStyled, ReplyItemStyled, ReplyListStyled } from "./style";

import { type PostComment, type PostCommentTree } from "@/features/posts/models/entities";
import { type MaybeStubItem } from "@/shared/types";
import { getStubItems } from "@/shared/utils/helpers/object";

export const renderToggleReplyTreeButtonIfPossible = ({
    descendantCount,
    onClick,
    title,
}: Pick<ButtonProps, "onClick" | "title"> & Pick<PostComment, "descendantCount">): ReactNode =>
    descendantCount > 0 && (
        <LinkButton fontSize="xs" onClick={onClick} view="secondary">
            {`${title} (${descendantCount})`}
        </LinkButton>
    );

const mapReplies = (
    reply: MaybeStubItem<PostCommentTree>,
    index: number,
    replies: MaybeStubItem<PostCommentTree>[],
) => {
    const isFirst = index === 0;
    const isLast = !!replies && replies.length - 1 === index;

    return (
        <ReplyItemStyled key={reply.id}>
            <CommentBranchStyled isFirst={isFirst} isLast={isLast} />
            <Comment item={reply}>
                {/* eslint-disable-next-line no-use-before-define */}
                {!!reply.replies?.length && renderReplies(reply)}
            </Comment>
        </ReplyItemStyled>
    );
};

export const renderReplies = (commentTree: MaybeStubItem<PostCommentTree>): ReactNode => (
    <ReplyListStyled>
        {commentTree.replies?.map(mapReplies)}
    </ReplyListStyled>
);

export const renderReplyStubs = (): ReactNode => (
    <ReplyListStyled>
        {getStubItems(1).map(mapReplies)}
    </ReplyListStyled>
);
