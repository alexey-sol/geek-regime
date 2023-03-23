import React, { type FC } from "react";
import styled from "styled-components";

import { Typography } from "@/shared/components/typography";
import { type User } from "@/features/users/models/entities";

export const UserDetailsStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const TitleStyled = styled.section`
    display: flex;
`;

export const BodyStyled = styled.section`
    display: flex;
    flex-direction: column;
`;

export type UserDetailsProps = {
    user: User;
};

export const UserDetails: FC<UserDetailsProps> = ({ user }) => (
    <UserDetailsStyled>
        <TitleStyled>
            <Typography>
                {user.details.name}
            </Typography>
        </TitleStyled>

        <BodyStyled>

        </BodyStyled>
    </UserDetailsStyled>
);
