import React, { type FC, useMemo } from "react";
import { type HasId, resources } from "@eggziom/geek-regime-js-commons";
import styled from "styled-components";

import { PageSettings } from "@/shared/components/page-settings";
import { Page } from "@/shared/components/page";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { ItemList } from "@/shared/components/item-list";
import { PostOverview } from "@/features/posts/components/post-overview";
import { getStubItems } from "@/shared/utils/helpers/object";

import { usePostsByAuthorPage } from "../utils/hooks/use-posts-by-author-page";

export const PageContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const PostsByAuthorPage: FC = () => {
    const { user } = useActiveUser();

    const { isPending, items, pagingOptions } = usePostsByAuthorPage();

    const pathPrefix = user
        ? createAbsoluteUsersPath(user.slug, resources.POSTS)
        : "";

    const itemsOrStubs: HasId[] = useMemo(() => (isPending
        ? getStubItems(pagingOptions.size)
        : items), [isPending, items, pagingOptions.size]);

    return (
        <Page pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <PageContentStyled>
                <PageSettings />
                <ItemList ItemComponent={PostOverview} items={itemsOrStubs} />
            </PageContentStyled>
        </Page>
    );
};
