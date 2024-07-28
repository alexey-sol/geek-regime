import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
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
            <section>{user.details.image ?? "image"}</section>

            <BodyStyled>
                <Link to={createAbsoluteUsersPath(user.slug)}>
                    <OneLineTextStyled view="caption">
                        {`${user.details.name} @${user.slug}`}
                    </OneLineTextStyled>
                </Link>

                <OneLineTextStyled>
                    {user.details.description ?? t("users.user.defaultDescription")}
                </OneLineTextStyled>
            </BodyStyled>
        </PostOverviewStyled>
    );
};
