import React, { useMemo, type FC } from "react";
import styled from "styled-components";
import { type HasId } from "@eggziom/geek-regime-js-commons";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { Page } from "@/shared/components/page";
import { PostOverview } from "@/features/posts/components/post-overview";
import { ItemList } from "@/shared/components/item-list";
import { createStubItem, getStubItems } from "@/shared/utils/helpers/object";
import { SpaceOverview } from "@/features/spaces/components/space-overview/space-overview";
import { PageSettings } from "@/shared/components/page-settings";
import { type HasPathPrefix } from "@/shared/types";

import { usePostsBySpacePage } from "../utils/hooks/use-posts-by-space-page";

export const PageContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const PostsBySpacePage: FC<HasPathPrefix> = ({ pathPrefix }) => {
    const {
        isPending, items, pagingOptions, space,
    } = usePostsBySpacePage();

    const spaceOrStub = useMemo(() => (isPending
        ? createStubItem()
        : space), [isPending, space]);

    const postsOrStubs: HasId[] = useMemo(() => (isPending
        ? getStubItems(pagingOptions.size)
        : items), [isPending, items, pagingOptions.size]);

    const spaceDescription = !!space?.description && (
        <Typography fontSize="sm">{space.description}</Typography>
    );

    return (
        <Page pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <PageContentStyled>
                <PageSettings />
                {spaceOrStub && (
                    <SpaceOverview item={spaceOrStub}>{spaceDescription}</SpaceOverview>
                )}
                <ItemList ItemComponent={PostOverview} items={postsOrStubs} />
            </PageContentStyled>
        </Page>
    );
};
