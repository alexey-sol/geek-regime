import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type CommentBoxProps } from "@/shared/components/comment-box";

import { type RootCommentContextValue } from "../../contexts/root-comment";

export type UseCommentBoxArg = Partial<Pick<CommentBoxProps, "body" | "onSubmit">>;

export type ReplyCommentBoxProps = UseCommentBoxArg
    & Pick<CommentBoxProps, "onClose">
    & Partial<Pick<RootCommentContextValue, "rootCommentId">>
    & {
        authorName?: string;
        commentId?: HasId["id"];
    };

export type EditCommentBoxProps = Omit<ReplyCommentBoxProps, "authorName" | "commentId">
    & Required<Pick<ReplyCommentBoxProps, "commentId">>;
