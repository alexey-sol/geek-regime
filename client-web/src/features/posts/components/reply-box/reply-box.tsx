import React, { memo, type ReactNode, useState } from "react";
import { Button, Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { CloseIconButton } from "@/shared/components/icon-button";
import { useCreatePostCommentMutation } from "@/features/posts/services/post-comments-api";
import { type RootCommentContextValue } from "@/features/posts/contexts/root-comment";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { purifyHtml } from "@/shared/utils/helpers/dom";

import { CommentEditorStyled, HeaderStyled, ReplyBoxStyled } from "./style";

export type ReplyBoxProps = Partial<Pick<RootCommentContextValue, "rootCommentId">> & {
    authorId: HasId["id"];
    onClose: () => void;
    onSubmit?: () => void;
    parentId?: HasId["id"];
    postId: HasId["id"];
    title?: ReactNode;
};

export const ReplyBox = memo(({
    authorId,
    onClose,
    onSubmit,
    parentId,
    postId,
    rootCommentId,
    title,
}: ReplyBoxProps) => {
    const [body, setBody] = useState("");
    const { t } = useTranslation();
    const { post } = useActivePost();
    const [createPostComment, result] = useCreatePostCommentMutation();

    const handleSubmit = () => {
        createPostComment({
            authorId,
            body: purifyHtml(body),
            parentId,
            postId,
            meta: {
                parentPostSlug: post?.slug,
                rootCommentId,
            },
        }).unwrap()
            .then(onSubmit)
            .catch(console.error);
    };

    return (
        <ReplyBoxStyled>
            <HeaderStyled>
                <Typography fontSize='sm'>
                    {title ?? t("posts.post.comments.actions.leaveCommentButton.title")}
                </Typography>
                <CloseIconButton onClick={onClose} />
            </HeaderStyled>
            <CommentEditorStyled
                onChange={setBody}
                placeholder={t("posts.post.comments.replyBox.placeholder")}
            />
            <Button onClick={handleSubmit}>
                {t("posts.post.comments.replyBox.actions.sendButton.title")}
            </Button>
        </ReplyBoxStyled>
    );
});
