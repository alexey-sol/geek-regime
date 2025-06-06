import React, { type FC, useMemo } from "react";
import { type HasId } from "@eggziom/geek-regime-js-commons";
import styled from "styled-components";

import { Page } from "@/shared/components/page";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { ItemList } from "@/shared/components/item-list";
import { PostOverview } from "@/features/posts/components/post-overview";
import { getStubItems } from "@/shared/utils/helpers/object";
import { PageSettings } from "@/features/posts/components/page-settings";

import { usePostsByAuthorPage } from "../utils/hooks/use-posts-by-author-page";

export const PageContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const PostsByAuthorPage: FC = () => {
    const { user } = useActiveUser();

    const { isPending, pagingOptions, posts } = usePostsByAuthorPage();

    const pathPrefix = user
        ? createAbsoluteUsersPath(user.slug, "posts")
        : "";

    const itemsOrStubs: HasId[] = useMemo(() => (isPending
        ? getStubItems(pagingOptions.size)
        : posts), [isPending, pagingOptions.size, posts]);

    return (
        <Page pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <PageContentStyled>
                <PageSettings />
                <ItemList ItemComponent={PostOverview} items={itemsOrStubs} />
            </PageContentStyled>
        </Page>
    );
};
