import React, { type FC, type PropsWithChildren } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { UserInfo } from "@/features/posts/components/user-info";
import { type PostCommentBase } from "@/features/posts/models/entities";
import { type HasItem } from "@/shared/types";

import { CommentStyled } from "./style";

export const Comment: FC<PropsWithChildren<HasItem<PostCommentBase>>> = ({ children, item }) => {
    const { t } = useTranslation();

    return (
        <CommentStyled>
            <UserInfo
                author={item.author}
                createdAt={item.createdAt}
                formattedCreatedAt={item.formattedCreatedAt}
            />

            {item.isDeleted
                ? <Typography color="grey">{t("posts.post.comments.isDeleted.placeholder")}</Typography>
                : <Typography>{item.body}</Typography>}

            {children}
        </CommentStyled>
    );
};
