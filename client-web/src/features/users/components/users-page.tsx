import React, { type FC, useMemo } from "react";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { useUsersPage } from "@/features/users/utils/hooks/use-users-page";
import { Page } from "@/shared/components/page";
import { ItemList } from "@/shared/components/item-list";
import { UserOverview } from "@/features/users/components/user-overview";
import { getStubItems } from "@/shared/utils/helpers/object";
import { type HasPathPrefix } from "@/shared/types";

export const UsersPage: FC<HasPathPrefix> = ({ pathPrefix }) => {
    const { isPending, pagingOptions, users } = useUsersPage();

    const itemsOrStubs: HasId[] = useMemo(() => (isPending
        ? getStubItems(pagingOptions.size)
        : users), [isPending, pagingOptions.size, users]);

    return (
        <Page pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <ItemList ItemComponent={UserOverview} items={itemsOrStubs} />
        </Page>
    );
};
