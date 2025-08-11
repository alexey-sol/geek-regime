import React, { type FC } from "react";
import { LinkButton } from "@eggziom/geek-regime-js-ui-kit/components/button";
import { ProfileIconButton } from "@eggziom/geek-regime-js-ui-kit/components/icon-button";
import { useTranslation } from "react-i18next";

import { UserImageStyled } from "../style";

import { type User } from "@/features/users/models/entities";

type ProfileButtonProps = {
    onClick: () => void;
    sizePx: number;
    user?: User;
};

export const ProfileButton: FC<ProfileButtonProps> = ({
    onClick,
    sizePx,
    user,
}) => {
    const { t } = useTranslation();

    return user?.details?.image
        ? (
            <LinkButton onClick={onClick}>
                <UserImageStyled
                    alt={user.details.name}
                    height={sizePx}
                    src={user.details.image}
                    width={sizePx}
                />
            </LinkButton>
        )
        : <ProfileIconButton onClick={onClick} title={t("shared.navbar.profileButton.tooltip")} />;
};
