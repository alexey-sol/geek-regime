import React, { type FC, memo } from "react";

import { UserList } from "@/features/users/components/user-list";
import { useUsersPage } from "@/features/users/utils/hooks/use-users-page";
import { Page } from "@/shared/components/page";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";

export const UserListView: FC = () => {
    const { isPending, pagingOptions } = useUsersPage();
    const pathPrefix = createAbsoluteUsersPath();

    return (
        <Page isPending={isPending} pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <UserList />
        </Page>
    );
};

export default memo(() => <UserListView />);
