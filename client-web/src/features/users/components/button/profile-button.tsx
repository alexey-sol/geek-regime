import React, { type FC } from "react";
import { LinkButton } from "@eggziom/geek-regime-js-ui-kit";

import { type User } from "@/features/users/models/entities";
import { ProfileIconButton } from "@/shared/components/icon-button";

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
}) => (user?.details?.image
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
    : <ProfileIconButton onClick={onClick} />);
