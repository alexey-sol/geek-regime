import React, { type FC, memo } from "react";
import styled from "styled-components";

import { Profile } from "@/features/users/components/profile";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";

export const ProfileViewStyled = styled.section`
    height: 100%;
`;

export const ProfileView: FC = () => {
    const { pending, user } = useActiveUser();

    if (!user) {
        return null; // TODO loading?
    }

    return (
        <ProfileViewStyled>
            {Boolean(pending) && "loading..."}
            <Profile user={user} />
        </ProfileViewStyled>
    );
};

export default memo(() => <ProfileView />);
