import React, { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { type PostComment } from "@/features/posts/models/entities";
import { type HasItem } from "@/shared/types";
import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import { useToggle } from "@/shared/utils/hooks/use-toggle";

import { Comment } from "./comment";
import { renderReplies, renderToggleReplyTreeButtonIfPossible } from "./utils";

export const ParentComment: FC<HasItem<PostComment>> = memo(({ item }) => {
    const { t } = useTranslation();

    const {
        isOn: showReplyTree,
        off: setShowReplyTreeOff,
        on: setShowReplyTreeOn,
    } = useToggle();

    const { commentTree, getReplies } = useRootCommentContext();

    const getAndOpenReplies = () => {
        setShowReplyTreeOn();
        getReplies();
    };

    const closeReplyTreeButton = renderToggleReplyTreeButtonIfPossible({
        descendantCount: item.descendantCount,
        onClick: setShowReplyTreeOff,
        title: t("posts.post.comments.actions.hideRepliesButton.title"),
    });

    const openReplyTreeButton = renderToggleReplyTreeButtonIfPossible({
        descendantCount: item.descendantCount,
        onClick: getAndOpenReplies,
        title: t("posts.post.comments.actions.showRepliesButton.title"),
    });

    const toggleReplyTreeButton = showReplyTree
        ? closeReplyTreeButton
        : openReplyTreeButton;

    return (
        <Comment item={item} footerChildren={toggleReplyTreeButton} onReply={getAndOpenReplies}>
            {showReplyTree && !!commentTree && renderReplies(commentTree)}
        </Comment>
    );
});
