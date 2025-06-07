import React, { type FC } from "react";
import { useTranslation } from "react-i18next";

import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { UserPicture } from "@/features/users/components/user-picture";
import { type User } from "@/features/users/models/entities";
import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { isStubItem } from "@/shared/utils/helpers/object";
import { Skeleton } from "@/shared/components/loaders";
import { usePrefetch } from "@/features/users/services/api";

import {
    BodyStyled, LinkStyled, OneLineTextStyled, UserNameTitleStyled,
} from "./style";

const PICTURE_SIZE_PX = 50;

export const UserOverview: FC<HasItem<MaybeStubItem<User>>> = ({ item }) => {
    const { t } = useTranslation();

    const userOrStub = isStubItem(item) ? undefined : item;
    const isLoading = isStubItem(item);

    const prefetchUserBySlug = usePrefetch("getUserBySlug");

    return (
        <LinkStyled
            onMouseEnter={() => item.slug && prefetchUserBySlug(item.slug)}
            to={createAbsoluteUsersPath(item.slug ?? "")}
        >
            <Skeleton isLoading={isLoading} heightPx={PICTURE_SIZE_PX} widthPx={PICTURE_SIZE_PX}>
                <UserPicture sizePx={PICTURE_SIZE_PX} user={userOrStub} />
            </Skeleton>

            <BodyStyled>
                <Skeleton isLoading={isLoading} heightPx={22} widthPx={250}>
                    <UserNameTitleStyled as="h3" title={item.details?.name}>
                        {`${item.details?.name} @${item.slug}`}
                    </UserNameTitleStyled>
                </Skeleton>

                <Skeleton isLoading={isLoading} heightPx={19} widthPx={350}>
                    <OneLineTextStyled>
                        {item.details?.description || t("users.user.defaultDescription")}
                    </OneLineTextStyled>
                </Skeleton>
            </BodyStyled>
        </LinkStyled>
    );
};
