import React, { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { type EditCommentBoxProps } from "./types";
import { PostCommentBox } from "./post-comment-box";

import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { purifyHtml } from "@/shared/utils/helpers/dom";
import { useUpdatePostCommentByIdMutation } from "@/features/posts/services/post-comments-api";
import { getUpdateCommentKey } from "@/features/posts/utils/api";
import { IllegalArgumentError } from "@/shared/utils/errors";

export const EditCommentBox: FC<EditCommentBoxProps> = ({
    body: initialBody = "",
    commentId,
    onClose,
    onSubmit,
    rootCommentId,
}) => {
    const { t } = useTranslation();
    const { post } = useActivePost();
    const [updatePostCommentById, { isLoading }] = useUpdatePostCommentByIdMutation({
        fixedCacheKey: getUpdateCommentKey(commentId),
    });

    const [body, setBody] = useState(initialBody);

    const handleSubmit = () => {
        if (!post) {
            throw new IllegalArgumentError("Post is required");
        }

        updatePostCommentById({
            body: purifyHtml(body),
            id: commentId,
            meta: {
                postId: post.id,
                rootCommentId,
            },
        })
            .then(onSubmit)
            .catch(console.error);
    };

    const title = t("posts.post.comments.commentBox.edit.title");
    const placeholder = t("posts.post.comments.commentBox.edit.placeholder");

    return (
        <PostCommentBox
            body={initialBody}
            disableSubmit={isLoading}
            onClose={onClose}
            onSubmit={handleSubmit}
            placeholder={placeholder}
            setBody={setBody}
            title={title}
        />
    );
};
