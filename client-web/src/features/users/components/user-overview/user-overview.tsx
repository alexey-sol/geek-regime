import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { User } from "@/features/users/models/entities";

import {
    BodyStyled, OneLineTextStyled, UserNameTitleStyled, UserOverviewStyled,
} from "./style";

export type UserOverviewProps = {
    user: User;
};

export const UserOverview: FC<UserOverviewProps> = ({ user }) => {
    const { t } = useTranslation();

    return (
        <UserOverviewStyled>
            <section>{user.details.image ?? "image"}</section>

            <BodyStyled>
                <Link to={createAbsoluteUsersPath(user.slug)}>
                    <UserNameTitleStyled as="h3" title={user.details.name}>
                        {`${user.details.name} @${user.slug}`}
                    </UserNameTitleStyled>
                </Link>

                <OneLineTextStyled>
                    {user.details.description ?? t("users.user.defaultDescription")}
                </OneLineTextStyled>
            </BodyStyled>
        </UserOverviewStyled>
    );
};
