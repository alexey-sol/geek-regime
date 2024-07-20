import React, { type FC } from "react";

import { Divider } from "@/shared/components/divider";
import { useUsersPage } from "@/features/users/utils/hooks/use-users-page";

import { UserOverview } from "../user-overview";

import { ListItemStyled, ListStyled, PostListStyled } from "./style";

export const UserList: FC = () => {
    const { users } = useUsersPage();

    const userOverviews = users.map((user, index) => (
        <ListItemStyled key={user.id}>
            {index > 0 && <Divider />}
            <UserOverview user={user} />
        </ListItemStyled>
    ));

    return (
        <PostListStyled>
            <ListStyled>
                {userOverviews}
            </ListStyled>
        </PostListStyled>
    );
};
