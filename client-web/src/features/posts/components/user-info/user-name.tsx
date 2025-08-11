import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@eggziom/geek-regime-js-ui-kit/components/tooltip";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";

import { LinkStyled } from "./style";
import { type AuthorInfoProps } from "./types";
import { PICTURE_SIZE_PX } from "./const";

import { UserPicture } from "@/features/users/components/user-picture";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";

const DefunctAccountTitle: FC = () => {
    const { t } = useTranslation();

    return (
        <Tooltip message={t("posts.post.author.name.default.tooltip")}>
            <Typography color="grey">
                {t("posts.post.author.name.default.title")}
            </Typography>
        </Tooltip>
    );
};

export const UserName: FC<Required<Pick<AuthorInfoProps, "author">>> = ({ author }) => (
    <LinkStyled
        data-testid="post-overview/author-slug-link"
        to={createAbsoluteUsersPath(author.slug ?? "")}
    >
        <UserPicture sizePx={PICTURE_SIZE_PX} user={author} />
        {author.details.name}
    </LinkStyled>
);

export const DefunctUserName: FC = () => (
    <>
        <UserPicture sizePx={PICTURE_SIZE_PX} />
        <DefunctAccountTitle />
    </>
);
