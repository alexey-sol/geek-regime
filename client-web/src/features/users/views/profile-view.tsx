import React, { type FC, memo } from "react";
import styled from "styled-components";

import { Profile } from "@/features/users/components/profile";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { ApiErrorMessage } from "@/shared/components/api-error-message";
import { Loader } from "@/shared/components/loaders";

const ProfileViewStyled = styled.section`
    height: 100%;
`;

export const ProfileView: FC = () => {
    const { errors, loading, user } = useActiveUser();

    return (
        <ProfileViewStyled>
            {!!loading && <Loader />}
            {user && <Profile user={user} />}
            {!!errors.get && <ApiErrorMessage error={errors.get} />}
        </ProfileViewStyled>
    );
};

export default memo(() => <ProfileView />);
