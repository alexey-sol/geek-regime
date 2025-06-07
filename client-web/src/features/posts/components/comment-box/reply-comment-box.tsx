import React, { useMemo, useState, type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { purifyHtml } from "@/shared/utils/helpers/dom";
import { useCreatePostCommentMutation } from "@/features/posts/services/post-comments-api";
import { getCreateCommentKey } from "@/features/posts/utils/api";

import { PostCommentBox } from "./post-comment-box";
import { type ReplyCommentBoxProps } from "./types";
import {IllegalArgumentError} from "@/shared/utils/errors";

export const ReplyCommentBox: FC<ReplyCommentBoxProps> = ({
    authorName,
    body: initialBody = "",
    commentId,
    onClose,
    onSubmit,
    rootCommentId,
}) => {
    const { t } = useTranslation();
    const { profile } = useAuthContext();
    const { post } = useActivePost();
    const [createPostComment, { isLoading }] = useCreatePostCommentMutation({
        fixedCacheKey: getCreateCommentKey(),
    });

    const [body, setBody] = useState(initialBody);

    const handleSubmit = () => {
        if (!profile || !post) {
            throw new IllegalArgumentError("User profile and post are required");
        }

        createPostComment({
            authorId: profile?.id,
            body: purifyHtml(body),
            parentId: commentId,
            postId: post.id,
            meta: {
                postSlug: post?.slug,
                rootCommentId,
            },
        })
            .then(onSubmit)
            .catch(console.error);
    };

    const title = useMemo(() => authorName && (
        <>
            {`${t("posts.post.comments.commentBox.reply.title")} `}
            <Typography as="span" color="primary">{authorName}</Typography>
        </>
    ), [authorName, t]);
    const placeholder = t("posts.post.comments.commentBox.reply.placeholder");

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
