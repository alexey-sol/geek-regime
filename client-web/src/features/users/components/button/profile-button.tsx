import React, { type FC } from "react";
import { LinkButton, ProfileIconButton } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { type User } from "@/features/users/models/entities";

import { UserImageStyled } from "../style";

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
