import React, { type FC, memo } from "react";

import { PostList } from "@/features/posts/components/post-list";
import { usePostsPage } from "@/features/posts/utils/hooks/use-posts-page";
import { Page } from "@/shared/components/page";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";

export const PostListView: FC = () => {
    const { isPending, pagingOptions } = usePostsPage();
    const pathPrefix = createAbsolutePostsPath();

    return (
        <Page isPending={isPending} pagingOptions={pagingOptions} pathPrefix={pathPrefix}>
            <PostList />
        </Page>
    );
};

export default memo(() => <PostListView />);
