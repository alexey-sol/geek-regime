import React, { type FC } from "react";

import { Page } from "@/shared/components/page";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { ItemList } from "@/shared/components/item-list";
import { PostOverview } from "@/features/posts/components/post-overview";

import { usePostsByAuthorPage } from "../utils/hooks/use-posts-by-author-page";

export const PostsByAuthorPage: FC = () => {
    const { pending, user } = useActiveUser();

    const { isPending, pagingOptions, posts } = usePostsByAuthorPage();

    const isAllPending = Boolean(pending) || isPending;
    const pathPrefix = user
        ? createAbsoluteUsersPath(user.slug, "posts")
        : "";

    return (
        <Page isPending={isAllPending} pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <ItemList ItemComponent={PostOverview} items={posts} />
        </Page>
    );
};
