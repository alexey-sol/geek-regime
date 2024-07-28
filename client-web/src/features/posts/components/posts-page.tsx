import React, { type FC } from "react";

import { PostList } from "@/features/posts/components/post-list";
import { usePostsPage } from "@/features/posts/utils/hooks/use-posts-page";
import { Page } from "@/shared/components/page";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";

export const PostsPage: FC = () => {
    const { isPending, pagingOptions, posts } = usePostsPage();
    const pathPrefix = createAbsolutePostsPath();

    return (
        <Page isPending={isPending} pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <PostList posts={posts} />
        </Page>
    );
};
