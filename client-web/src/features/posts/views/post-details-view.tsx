import React, { type FC, memo } from "react";

import { PostDetails } from "@/features/posts/components/post-details";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";

export const PostDetailsView: FC = () => {
    const { pending, post } = useActivePost();

    if (!post) {
        return null; // TODO loading?
    }

    return (
        <section>
            {Boolean(pending) && "loading..."}
            <PostDetails post={post} />
        </section>
    );
};

export default memo(() => <PostDetailsView />);
