import React, { type FC, type PropsWithChildren, type ReactNode } from "react";
import { LinkButton, Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { UserInfo } from "@/features/posts/components/user-info";
import { type PostCommentBase } from "@/features/posts/models/entities";
import { type HasItem } from "@/shared/types";
import { createInnerHtml } from "@/shared/utils/helpers/dom";
import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import { useAuthContext } from "@/features/auth/contexts/auth";

import { EditCommentBox, ReplyCommentBox, useCommentBox } from "../comment-box";

import { BodyTypographyStyled, CommentFooterStyled, CommentStyled } from "./style";

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
        closeBox, onSubmitSuccess, openEditBox, openReplyBox, showEditBox, showReplyBox,
    } = useCommentBox({
        onSubmit: onReply,
    });

    const commentBody = item.isDeleted
        ? <Typography color="grey">{t("posts.post.comments.isDeleted.placeholder")}</Typography>
        : (
            <BodyTypographyStyled
                dangerouslySetInnerHTML={createInnerHtml(item.body)}
                isHighlighted={showEditBox}
            />
        );

    const isAuthor = profile && profile.id === item.author.id;

    const openEditBoxButton = (
        <LinkButton fontSize="xs" onClick={openEditBox} view="primary">
            {t("posts.post.comments.actions.showEditCommentBoxButton.title")}
        </LinkButton>
    );

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
                        {!showEditBox && isAuthor && openEditBoxButton}
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
                            onSubmit={onSubmitSuccess}
                            rootCommentId={rootCommentId}
                        />
                    )}
                    {showReplyBox && !isAuthor && (
                        <ReplyCommentBox
                            authorName={item.author.details.name}
                            commentId={item.id}
                            onClose={closeBox}
                            onSubmit={onSubmitSuccess}
                            rootCommentId={rootCommentId}
                        />
                    )}
                </>
            )}
            {children}
        </CommentStyled>
    );
};
