import React, { type FC, useMemo } from "react";
import { type HasId, resources } from "@eggziom/geek-regime-js-utils";
import styled from "styled-components";

import { ProfilePostComment } from "./profile-post-comment";

import { Page } from "@/shared/components/page";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { ItemList } from "@/shared/components/item-list";
import { getStubItems } from "@/shared/utils/helpers/object";
import { PageSettings } from "@/shared/components/page-settings";
import { usePostCommentsByAuthorPage } from "@/features/posts/utils/hooks/use-post-comments-by-author-page";

export const PageContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const PostCommentsByAuthorPage: FC = () => {
    const { user } = useActiveUser();
    const { isPending, items, pagingOptions } = usePostCommentsByAuthorPage();

    const pathPrefix = user
        ? createAbsoluteUsersPath(user.slug, resources.COMMENTS)
        : "";

    const itemsOrStubs: HasId[] = useMemo(() => (isPending
        ? getStubItems(pagingOptions.size)
        : items), [isPending, items, pagingOptions.size]);

    return (
        <Page pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <PageContentStyled>
                <PageSettings />
                <ItemList ItemComponent={ProfilePostComment} items={itemsOrStubs} />
            </PageContentStyled>
        </Page>
    );
};
