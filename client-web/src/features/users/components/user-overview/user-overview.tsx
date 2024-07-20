import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { User } from "@/features/users/models/entities";

import {
    BodyStyled,
    OneLineTextStyled,
    PostOverviewStyled,
} from "./style";

export type UserOverviewProps = {
    user: User;
};

export const UserOverview: FC<UserOverviewProps> = ({ user }) => {
    const { t } = useTranslation();

    return (
        <PostOverviewStyled>
            <Link to={createAbsolutePostsPath(user.slug)}>
                <BodyStyled>
                    <OneLineTextStyled view="caption">
                        {user.details.name}
                    </OneLineTextStyled>
                    <OneLineTextStyled>
                        {/* user.details.description TODO render description */}
                        {t("users.user.defaultDescription")}
                    </OneLineTextStyled>
                </BodyStyled>
            </Link>
        </PostOverviewStyled>
    );
};
