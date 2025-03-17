import React, { type FC, useMemo } from "react";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { Page } from "@/shared/components/page";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { ItemList } from "@/shared/components/item-list";
import { PostOverview } from "@/features/posts/components/post-overview";
import { getStubItems } from "@/shared/utils/helpers/object";

import { usePostsByAuthorPage } from "../utils/hooks/use-posts-by-author-page";

export const PostsByAuthorPage: FC = () => {
    const { user } = useActiveUser();

    const { isPending, pagingOptions, posts } = usePostsByAuthorPage();

    const pathPrefix = user
        ? createAbsoluteUsersPath(user.slug, "posts")
        : "";

    const postsOrStubs: HasId[] = useMemo(() => (isPending
        ? getStubItems(pagingOptions.size)
        : posts), [isPending, pagingOptions.size, posts]);

    return (
        <Page pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <ItemList ItemComponent={PostOverview} items={postsOrStubs} />
        </Page>
    );
};
