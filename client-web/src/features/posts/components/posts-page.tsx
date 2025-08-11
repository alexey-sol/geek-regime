import React, { useMemo, type FC } from "react";
import styled from "styled-components";
import { type HasId } from "@eggziom/geek-regime-js-utils";

import { usePostsPage } from "@/features/posts/utils/hooks/use-posts-page";
import { Page } from "@/shared/components/page";
import { PostOverview } from "@/features/posts/components/post-overview";
import { ItemList } from "@/shared/components/item-list";
import { getStubItems } from "@/shared/utils/helpers/object";
import { PageSettings } from "@/shared/components/page-settings";
import { type HasPathPrefix } from "@/shared/types";

export const PageContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const PostsPage: FC<HasPathPrefix> = ({ pathPrefix }) => {
    const { isPending, items, pagingOptions } = usePostsPage();

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
