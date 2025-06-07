import React, { type FC } from "react";

import { UserIcon } from "@/shared/components/icon";
import { type User } from "@/features/users/models/entities";

import { UserImageStyled } from "./style";

type UserPictureProps = {
    sizePx: number;
    user?: User;
};

export const UserPicture: FC<UserPictureProps> = ({ sizePx, user }) => (user?.details.image
    ? (
        <UserImageStyled
            alt={user.details.name}
            height={sizePx}
            src={user.details.image}
            width={sizePx}
        />
    )
    : (
        <UserIcon color="purpleLighten" size={sizePx} />
    ));
