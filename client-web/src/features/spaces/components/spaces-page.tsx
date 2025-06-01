import React, { useMemo, type FC } from "react";
import styled from "styled-components";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { useSpacesPage } from "@/features/spaces/utils/hooks/use-spaces-page";
import { Page } from "@/shared/components/page";
import { ItemList } from "@/shared/components/item-list";
import { SpaceOverview } from "@/features/spaces/components/space-overview/space-overview";
import { getStubItems } from "@/shared/utils/helpers/object";
import { type HasPathPrefix } from "@/shared/types";

export const PageContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const SpacesPage: FC<HasPathPrefix> = ({ pathPrefix }) => {
    const { isPending, pagingOptions, spaces } = useSpacesPage();

    const itemsOrStubs: HasId[] = useMemo(() => (isPending
        ? getStubItems(pagingOptions.size)
        : spaces), [isPending, pagingOptions.size, spaces]);

    return (
        <Page pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <PageContentStyled>
                <ItemList ItemComponent={SpaceOverview} items={itemsOrStubs} noDividers />
            </PageContentStyled>
        </Page>
    );
};
