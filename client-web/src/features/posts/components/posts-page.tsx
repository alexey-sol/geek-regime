import React, { type FC } from "react";

import { usePostsPage } from "@/features/posts/utils/hooks/use-posts-page";
import { Page } from "@/shared/components/page";
import { PostOverview } from "@/features/posts/components/post-overview";
import { ItemList } from "@/shared/components/item-list";
import { type HasPathPrefix } from "@/shared/types";

export const PostsPage: FC<HasPathPrefix> = ({ pathPrefix }) => {
    const { isPending, pagingOptions, posts } = usePostsPage();

    return (
        <Page isPending={isPending} pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <ItemList ItemComponent={PostOverview} items={posts} />
        </Page>
    );
};
