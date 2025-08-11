import React, {
    type FC, type PropsWithChildren, type ReactNode, useMemo,
} from "react";
import { LinkButton } from "@eggziom/geek-regime-js-ui-kit/components/button";
import { Tooltip } from "@eggziom/geek-regime-js-ui-kit/components/tooltip";
import { useTranslation } from "react-i18next";

import { CommentContent, CommentContentStyled } from "../comment-content";
import { EditCommentBox, ReplyCommentBox, useCommentBox } from "../comment-box";

import { useComment } from "./utils";

import { type PostCommentBase } from "@/features/posts/models/entities";
import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { isStubItem } from "@/shared/utils/helpers/object";

type CommentProps = HasItem<MaybeStubItem<PostCommentBase>> & {
    footerChildren?: ReactNode;
    onReply?: () => void;
};

export const Comment: FC<PropsWithChildren<CommentProps>> = ({
    children,
    footerChildren,
    item,
    onReply,
}) => {
    const { t } = useTranslation();
    const { profile } = useAuthContext();
    const { rootComment } = useRootCommentContext();

    const {
        closeBox,
        onEditSuccess,
        onReplySuccess,
        openEditBox,
        openReplyBox,
        showEditBox,
        showReplyBox,
    } = useCommentBox({
        onSubmit: onReply,
    });

    const {
        isAuthor, pending, removeButtonView, tryRemoveComment,
    } = useComment({ item });

    const isLoading = isStubItem(item);

    const disableEditButtons = pending === "update" || pending === "remove";

    const editCommentButtons = useMemo(() => (
        <>
            <LinkButton
                disabled={disableEditButtons}
                fontSize="xs"
                onClick={openEditBox}
                view="primary"
            >
                {t("posts.post.comments.actions.showEditCommentBoxButton.title")}
            </LinkButton>

            <Tooltip message={t("shared.tooltips.tryAction")}>
                <LinkButton
                    disabled={disableEditButtons}
                    fontSize="xs"
                    onClick={tryRemoveComment}
                    view={removeButtonView}
                >
                    {t("posts.post.comments.actions.removeCommentButton.title")}
                </LinkButton>
            </Tooltip>
        </>
    ), [disableEditButtons, openEditBox, removeButtonView, t, tryRemoveComment]);

    const openReplyBoxButton = (
        <LinkButton fontSize="xs" onClick={openReplyBox} view="primary">
            {t("posts.post.comments.actions.showReplyCommentBoxButton.title")}
        </LinkButton>
    );

    return (
        <CommentContentStyled>
            <CommentContent isHighlighted={showEditBox} isLoading={isLoading} item={item}>
                {footerChildren}
                {!item.isDeleted && !!profile && (
                    <>
                        {!showEditBox && isAuthor && editCommentButtons}
                        {!showReplyBox && !isAuthor && openReplyBoxButton}
                    </>
                )}
            </CommentContent>

            {!!profile && (
                <>
                    {showEditBox && isAuthor && (
                        <EditCommentBox
                            body={item.body}
                            commentId={item.id}
                            onClose={closeBox}
                            onSubmit={onEditSuccess}
                            rootCommentId={rootComment.id}
                        />
                    )}
                    {showReplyBox && !isAuthor && (
                        <ReplyCommentBox
                            authorName={item.author?.details.name}
                            commentId={item.id}
                            onClose={closeBox}
                            onSubmit={onReplySuccess}
                            rootCommentId={rootComment.id}
                        />
                    )}
                </>
            )}

            {children}
        </CommentContentStyled>
    );
};
