import React, { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { purifyHtml } from "@/shared/utils/helpers/dom";
import { useUpdatePostCommentMutation } from "@/features/posts/services/post-comments-api";

import { type EditCommentBoxProps } from "./types";
import { PostCommentBox } from "./post-comment-box";

export const EditCommentBox: FC<EditCommentBoxProps> = ({
    body: initialBody = "",
    commentId,
    onClose,
    onSubmit,
    rootCommentId,
}) => {
    const { t } = useTranslation();
    const { post } = useActivePost();
    const [updatePostComment] = useUpdatePostCommentMutation(); // TODO loader

    const [body, setBody] = useState(initialBody);

    const handleSubmit = () => {
        if (!post) {
            return;
        }

        updatePostComment({
            body: purifyHtml(body),
            id: commentId,
            meta: { rootCommentId },
        })
            .then(onSubmit)
            .catch(console.error);
    };

    const title = t("posts.post.comments.commentBox.edit.title");
    const placeholder = t("posts.post.comments.commentBox.edit.placeholder");

    return (
        <PostCommentBox
            body={body}
            onClose={onClose}
            onSubmit={handleSubmit}
            placeholder={placeholder}
            setBody={setBody}
            title={title}
        />
    );
};
