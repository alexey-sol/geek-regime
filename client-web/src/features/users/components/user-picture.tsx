import React, { type FC } from "react";

import { UserIcon } from "@/shared/components/icon";
import { type User } from "@/features/users/models/entities";

import { UserImageStyled } from "./style";

type UserPictureProps = {
    sizePx: number;
    user?: User;
};

/**
 * Renders the user's picture with a link to the source image or a placeholder if the user has no
 * picture.
 */
export const UserPicture: FC<UserPictureProps> = ({ sizePx, user }) => (user?.details.image
    ? (
        <a href={user.details.image} target="_blank" rel="noreferrer">
            <UserImageStyled
                alt={user.details.name}
                height={sizePx}
                src={user.details.image}
                width={sizePx}
            />
        </a>
    )
    : (
        <UserIcon color="purpleLighten" size={sizePx} />
    ));
