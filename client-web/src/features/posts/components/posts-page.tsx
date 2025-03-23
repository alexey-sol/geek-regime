import React, { useMemo, type FC } from "react";
import styled from "styled-components";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { usePostsPage } from "@/features/posts/utils/hooks/use-posts-page";
import { Page } from "@/shared/components/page";
import { PostOverview } from "@/features/posts/components/post-overview";
import { ItemList } from "@/shared/components/item-list";
import { getStubItems } from "@/shared/utils/helpers/object";
import { type HasPathPrefix } from "@/shared/types";

import { PageSettings } from "./page-settings";

export const PageContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const PostsPage: FC<HasPathPrefix> = ({ pathPrefix }) => {
    const { isPending, pagingOptions, posts } = usePostsPage();

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
