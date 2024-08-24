import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { User } from "@/features/users/models/entities";
import { type HasItem } from "@/shared/types";

import {
    BodyStyled, OneLineTextStyled, UserNameTitleStyled, UserOverviewStyled,
} from "./style";

export const UserOverview: FC<HasItem<User>> = ({ item }) => {
    const { t } = useTranslation();

    return (
        <UserOverviewStyled>
            <section>{item.details.image ?? "image"}</section>

            <BodyStyled>
                <Link to={createAbsoluteUsersPath(item.slug)}>
                    <UserNameTitleStyled as="h3" title={item.details.name}>
                        {`${item.details.name} @${item.slug}`}
                    </UserNameTitleStyled>
                </Link>

                <OneLineTextStyled>
                    {item.details.description ?? t("users.user.defaultDescription")}
                </OneLineTextStyled>
            </BodyStyled>
        </UserOverviewStyled>
    );
};
