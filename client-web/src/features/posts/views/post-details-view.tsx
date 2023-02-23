import React, { type FC, memo } from "react";

import { PostDetails } from "@/features/posts/components/post-details";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";

export const PostDetailsView: FC = () => {
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

export default memo(() => <PostDetailsView />);
