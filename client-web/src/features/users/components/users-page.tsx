import React, { type FC } from "react";

import { useUsersPage } from "@/features/users/utils/hooks/use-users-page";
import { Page } from "@/shared/components/page";
import { ItemList } from "@/shared/components/item-list";
import { UserOverview } from "@/features/users/components/user-overview";
import { type HasPathPrefix } from "@/shared/types";

export const UsersPage: FC<HasPathPrefix> = ({ pathPrefix }) => {
    const { isPending, pagingOptions, users } = useUsersPage();

    return (
        <Page isPending={isPending} pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <ItemList ItemComponent={UserOverview} items={users} />
        </Page>
    );
};
