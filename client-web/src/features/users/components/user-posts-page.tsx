import React, { type FC } from "react";

import { Page } from "@/shared/components/page";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";
import { usePostsPage } from "@/features/posts/utils/hooks/use-posts-page";
import { ItemList } from "@/shared/components/item-list";
import { PostOverview } from "@/features/posts/components/post-overview";
import { type UsePostsPageArg } from "@/features/posts/utils/hooks/types";

export const UserPostsPage: FC = () => {
    const { pending, user } = useActiveUser();

    const filter: UsePostsPageArg["filter"] = user && {
        authorId: user?.id,
    };

    const { isPending, pagingOptions, posts } = usePostsPage({ filter });

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
