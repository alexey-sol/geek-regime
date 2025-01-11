import React, { type ReactNode } from "react";
import { type ButtonProps, LinkButton } from "@eggziom/geek-regime-js-ui-kit";

import { type PostComment, type PostCommentTree } from "@/features/posts/models/entities";

import { Comment } from "./comment";
import { CommentBranchStyled, ReplyItemStyled, ReplyListStyled } from "./style";

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

export const renderReplies = (commentTree: PostCommentTree): ReactNode => (
    <ReplyListStyled>
        {commentTree.replies.map((reply, index) => (
            <ReplyItemStyled key={reply.id}>
                <CommentBranchStyled
                    isFirst={index === 0}
                    isLast={commentTree.replies.length - 1 === index}
                />
                <Comment item={reply}>
                    {!!reply.replies.length && renderReplies(reply)}
                </Comment>
            </ReplyItemStyled>
        ))}
    </ReplyListStyled>
);
