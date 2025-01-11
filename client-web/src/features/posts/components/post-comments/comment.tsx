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

import { useReplyBox } from "../reply-box";

import { CommentFooterStyled, CommentStyled } from "./style";

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
    const { rootCommentId } = useRootCommentContext();

    const commentBody = item.isDeleted
        ? <Typography color="grey">{t("posts.post.comments.isDeleted.placeholder")}</Typography>
        : <Typography dangerouslySetInnerHTML={createInnerHtml(item.body)} />;

    const replyBoxTitle = useMemo(() => (
        <>
            {`${t("posts.post.comments.replyBox.title")} `}
            <Typography as='span' color="primary">{item.author.details.name}</Typography>
        </>
    ), [item.author.details.name, t]);

    const { openReplyBox, replyBoxIfAvailable, showReplyBox } = useReplyBox({
        onSubmit: onReply,
        parentId: item.id,
        rootCommentId,
        title: replyBoxTitle,
    });

    const openReplyBoxButton = (
        <LinkButton fontSize="xs" onClick={openReplyBox} view="primary">
            {t("posts.post.comments.actions.showReplyBoxButton.title")}
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
                {!showReplyBox && !item.isDeleted && openReplyBoxButton}
            </CommentFooterStyled>
            {showReplyBox && replyBoxIfAvailable}
            {children}
        </CommentStyled>
    );
};
