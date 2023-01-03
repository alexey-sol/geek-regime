import React, { memo } from "react";

import { PostDetails } from "@/features/posts/components/post-details";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";

export const PostDetailsView = () => {
    const { post, isPending } = useActivePost();

    if (!post) {
        return null;
    }

    return (
        <section>
            {isPending && "loading..."}
            <PostDetails post={post} />
        </section>
    );
};

// eslint-disable-next-line import/no-default-export
export default memo(() => <PostDetailsView />);
