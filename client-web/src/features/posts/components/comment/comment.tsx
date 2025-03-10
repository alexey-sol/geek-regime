import React, {
    type FC, type PropsWithChildren, type ReactNode, useMemo,
} from "react";
import { LinkButton, Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { UserInfo } from "@/features/posts/components/user-info";
import { type PostCommentBase } from "@/features/posts/models/entities";
import { type HasItem } from "@/shared/types";
import { createInnerHtml } from "@/shared/utils/helpers/dom";
import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { Tooltip } from "@/shared/components/tooltip";

import { EditCommentBox, ReplyCommentBox, useCommentBox } from "../comment-box";

import { BodyTypographyStyled, CommentStyled, CommentFooterStyled } from "./style";
import { useComment } from "./utils";

type CommentProps = HasItem<PostCommentBase> & {
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
    const { rootCommentId } = useRootCommentContext();

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

    const commentBody = item.isDeleted
        ? <Typography color="grey">{item.body}</Typography>
        : (
            <BodyTypographyStyled
                dangerouslySetInnerHTML={createInnerHtml(item.body)}
                isHighlighted={showEditBox}
            />
        );

    const editCommentButtons = useMemo(() => (
        <>
            <LinkButton
                disabled={pending === "update"}
                fontSize="xs"
                onClick={openEditBox}
                view="primary"
            >
                {t("posts.post.comments.actions.showEditCommentBoxButton.title")}
            </LinkButton>

            <Tooltip message={t("shared.tooltips.tryAction")}>
                <LinkButton
                    disabled={pending === "remove"}
                    fontSize="xs"
                    onClick={tryRemoveComment}
                    view={removeButtonView}
                >
                    {t("posts.post.comments.actions.removeCommentButton.title")}
                </LinkButton>
            </Tooltip>
        </>
    ), [openEditBox, pending, removeButtonView, t, tryRemoveComment]);

    const openReplyBoxButton = (
        <LinkButton fontSize="xs" onClick={openReplyBox} view="primary">
            {t("posts.post.comments.actions.showReplyCommentBoxButton.title")}
        </LinkButton>
    );

    return (
        <CommentStyled>
            <UserInfo
                author={item.author}
                createdAt={item.createdAt}
                formattedCreatedAt={item.formattedCreatedAt}
            />
            {commentBody}
            <CommentFooterStyled>
                {footerChildren}
                {!item.isDeleted && !!profile && (
                    <>
                        {!showEditBox && isAuthor && editCommentButtons}
                        {!showReplyBox && !isAuthor && openReplyBoxButton}
                    </>
                )}
            </CommentFooterStyled>
            {!!profile && (
                <>
                    {showEditBox && isAuthor && (
                        <EditCommentBox
                            body={item.body}
                            commentId={item.id}
                            onClose={closeBox}
                            onSubmit={onEditSuccess}
                            rootCommentId={rootCommentId}
                        />
                    )}
                    {showReplyBox && !isAuthor && (
                        <ReplyCommentBox
                            authorName={item.author?.details.name}
                            commentId={item.id}
                            onClose={closeBox}
                            onSubmit={onReplySuccess}
                            rootCommentId={rootCommentId}
                        />
                    )}
                </>
            )}
            {children}
        </CommentStyled>
    );
};
