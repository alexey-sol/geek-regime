import React, { type FC } from "react";
import { UserIcon } from "@eggziom/geek-regime-js-ui-kit/components/icon";

import { UserImageStyled } from "./style";

import { type User } from "@/features/users/models/entities";

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
