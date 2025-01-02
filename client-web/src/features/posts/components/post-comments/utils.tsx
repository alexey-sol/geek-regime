import React from "react";

import { PostCommentTree } from "@/features/posts/models/entities";

import { Comment } from "./comment";
import { CommentBranchStyled, ReplyItemStyled, ReplyListStyled } from "./style";

export const renderReplies = (commentTree: PostCommentTree): JSX.Element => (
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
