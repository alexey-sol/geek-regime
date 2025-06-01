import React, { useMemo, type FC } from "react";
import styled from "styled-components";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { usePostsBySpacePage } from "@/features/posts/utils/hooks/use-posts-by-space-page";
import { Page } from "@/shared/components/page";
import { PostOverview } from "@/features/posts/components/post-overview";
import { ItemList } from "@/shared/components/item-list";
import { createStubItem, getStubItems } from "@/shared/utils/helpers/object";
import { type HasPathPrefix } from "@/shared/types";
import { SpaceOverview } from "@/features/spaces/components/space-overview/space-overview";

import { PageSettings } from "./page-settings";

export const PageContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const PostsBySpacePage: FC<HasPathPrefix> = ({ pathPrefix }) => {
    const {
        isPending, pagingOptions, posts, space,
    } = usePostsBySpacePage();

    const spaceOrStub = useMemo(() => (isPending
        ? createStubItem()
        : space), [isPending, space]);

    const postsOrStubs: HasId[] = useMemo(() => (isPending
        ? getStubItems(pagingOptions.size)
        : posts), [isPending, pagingOptions.size, posts]);

    return (
        <Page pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <PageContentStyled>
                <PageSettings />
                {spaceOrStub && <SpaceOverview item={spaceOrStub} />}
                <ItemList ItemComponent={PostOverview} items={postsOrStubs} />
            </PageContentStyled>
        </Page>
    );
};
