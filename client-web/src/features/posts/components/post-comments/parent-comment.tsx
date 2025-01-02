import React, {
    type FC, memo, useCallback, useMemo,
} from "react";
import { LinkButton } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { type PostComment } from "@/features/posts/models/entities";
import { type HasItem } from "@/shared/types";
import { useLazyGetPostCommentTreeByParentIdQuery } from "@/features/posts/services/post-comments-api";
import { toPostCommentTree } from "@/features/posts/utils/converters";
import { useToggle } from "@/shared/utils/hooks/use-toggle";

import { Comment } from "./comment";
import { renderReplies } from "./utils";

export const ParentComment: FC<HasItem<PostComment>> = memo(({ item }) => {
    const { t } = useTranslation();
    const { isOn: showReplies, toggleOn: toggleShowReplies } = useToggle();
    const [getPostCommentTreeByParentId, { data }] = useLazyGetPostCommentTreeByParentIdQuery();

    const commentTree = useMemo(() => data && toPostCommentTree(data), [data]);

    const toggleReplies = useCallback(() => {
        // TODO add loader
        toggleShowReplies();
        getPostCommentTreeByParentId(item.id, true);
    }, [getPostCommentTreeByParentId, item.id, toggleShowReplies]);

    const toggleRepliesTitle = showReplies
        ? t("posts.post.comments.hideRepliesButton.title")
        : t("posts.post.comments.showRepliesButton.title");

    return (
        <Comment item={item}>
            {item.descendantCount > 0 && (
                <LinkButton fontSize="xs" onClick={toggleReplies} view="secondary">
                    {`${toggleRepliesTitle} (${item.descendantCount})`}
                </LinkButton>
            )}

            {showReplies && !!commentTree && renderReplies(commentTree)}
        </Comment>
    );
});
