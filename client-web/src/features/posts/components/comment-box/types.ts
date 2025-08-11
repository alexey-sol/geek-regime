import { type HasId } from "@eggziom/geek-regime-js-utils";

import { type CommentBoxProps } from "@/shared/components/comment-box";
import { type HasRootCommentId } from "@/features/posts/services/post-comments-api/types";

export type UseCommentBoxArg = Partial<Pick<CommentBoxProps, "body" | "onSubmit">>;

export type ReplyCommentBoxProps = UseCommentBoxArg
    & Pick<CommentBoxProps, "onClose">
    & Partial<HasRootCommentId>
    & {
        authorName?: string;
        commentId?: HasId["id"];
    };

export type EditCommentBoxProps = Omit<ReplyCommentBoxProps, "authorName"
    | "commentId"
    | "rootCommentId"
> & Required<Pick<ReplyCommentBoxProps, "commentId" | "rootCommentId">>;
