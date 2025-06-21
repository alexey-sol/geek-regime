import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import { useToggle } from "@/shared/utils/hooks/use-toggle";
import { usePrefetch } from "@/features/posts/services/post-comments-api";

import { Comment } from "../comment";

import {
    renderReplies, renderReplyStubs, renderToggleReplyTreeButtonIfPossible,
} from "./utils";

const DEFAULT_COUNT = 0;

export const ParentComment = memo(() => {
    const { t } = useTranslation();

    const {
        isOn: showReplyTree,
        off: setShowReplyTreeOff,
        on: setShowReplyTreeOn,
    } = useToggle();

    const {
        commentTree, getReplies, pending, rootComment,
    } = useRootCommentContext();

    const getAndShowReplies = () => {
        setShowReplyTreeOn();
        getReplies();
    };

    const closeReplyTreeButton = renderToggleReplyTreeButtonIfPossible({
        descendantCount: rootComment.descendantCount ?? DEFAULT_COUNT,
        onClick: setShowReplyTreeOff,
        title: t("posts.post.comments.actions.hideRepliesButton.title"),
    });

    const openReplyTreeButton = renderToggleReplyTreeButtonIfPossible({
        descendantCount: rootComment.descendantCount ?? DEFAULT_COUNT,
        onClick: getAndShowReplies,
        title: t("posts.post.comments.actions.showRepliesButton.title"),
    });

    const prefetchPostCommentTreeByParentId = usePrefetch("getPostCommentTreeByParentId");

    const toggleReplyTreeButton = !!rootComment.descendantCount && (
        <section onMouseEnter={() => !showReplyTree && prefetchPostCommentTreeByParentId(rootComment.id)}>
            {showReplyTree ? closeReplyTreeButton : openReplyTreeButton}
        </section>
    );

    const replies = commentTree && renderReplies(commentTree);

    const itemsOrStubs = useMemo(() => (pending === "getReplies"
        ? renderReplyStubs()
        : replies), [pending, replies]);

    return (
        <Comment
            item={rootComment}
            footerChildren={toggleReplyTreeButton}
            onReply={getAndShowReplies}
        >
            {showReplyTree && itemsOrStubs}
        </Comment>
    );
});
