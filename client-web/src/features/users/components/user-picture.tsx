import React, { type FC } from "react";
import styled from "styled-components";

import { UserIcon } from "@/shared/components/icon";
import { type User } from "@/features/users/models/entities";

const StyledImage = styled.img`
    display: flex;
`;

type UserPictureProps = {
    sizePx: number;
    user?: User;
};

export const UserPicture: FC<UserPictureProps> = ({ sizePx, user }) => (user?.details.image
    ? (
        <a href={user.details.image} target="_blank" rel="noreferrer">
            <StyledImage
                alt={user.details.name}
                src={user.details.image}
                width={sizePx}
                height={sizePx}
            />
        </a>
    )
    : (
        <UserIcon color="purpleLighten" size={sizePx} />
    ));
