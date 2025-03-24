import React, { type FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { type PostComment } from "@/features/posts/models/entities";
import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import { useToggle } from "@/shared/utils/hooks/use-toggle";

import { Comment } from "../comment";

import {
    renderReplies, renderReplyStubs, renderToggleReplyTreeButtonIfPossible,
} from "./utils";

const DEFAULT_COUNT = 0;

export const ParentComment: FC<HasItem<MaybeStubItem<PostComment>>> = memo(({ item }) => {
    const { t } = useTranslation();

    const {
        isOn: showReplyTree,
        off: setShowReplyTreeOff,
        on: setShowReplyTreeOn,
    } = useToggle();

    const { commentTree, getReplies, pending } = useRootCommentContext();

    const getAndShowReplies = () => {
        setShowReplyTreeOn();
        getReplies();
    };

    const closeReplyTreeButton = renderToggleReplyTreeButtonIfPossible({
        descendantCount: item.descendantCount ?? DEFAULT_COUNT,
        onClick: setShowReplyTreeOff,
        title: t("posts.post.comments.actions.hideRepliesButton.title"),
    });

    const openReplyTreeButton = renderToggleReplyTreeButtonIfPossible({
        descendantCount: item.descendantCount ?? DEFAULT_COUNT,
        onClick: getAndShowReplies,
        title: t("posts.post.comments.actions.showRepliesButton.title"),
    });

    const toggleReplyTreeButton = showReplyTree
        ? closeReplyTreeButton
        : openReplyTreeButton;

    const replies = commentTree && renderReplies(commentTree);

    const itemsOrStubs = useMemo(() => (pending === "getReplies"
        ? renderReplyStubs()
        : replies), [pending, replies]);

    return (
        <Comment
            item={item}
            footerChildren={toggleReplyTreeButton}
            onReply={getAndShowReplies}
        >
            {showReplyTree && itemsOrStubs}
        </Comment>
    );
});
