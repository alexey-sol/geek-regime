import React, {
    type FC, memo, useCallback, useState,
} from "react";

import { PostDetails } from "@/features/posts/components/post-details";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { PostComments } from "@/features/posts/components/post-comments";
import { useInfiniteScroll } from "@/shared/utils/hooks/use-infinite-scroll";

export const PostDetailsView: FC = () => {
    const [showComments, setShowComments] = useState(false);

    const { pending, post } = useActivePost();

    const onLoadMore = useCallback(() => {
        setShowComments(true);
    }, []);

    const { scrollableRef } = useInfiniteScroll({
        hasMore: Boolean(post) && !showComments,
        onLoadMore,
    });

    return (
        <section>
            {Boolean(pending) && "loading..."}
            <PostDetails />

            <section ref={scrollableRef}>
                {showComments && <PostComments />}
            </section>
        </section>
    );
};

export default memo(() => <PostDetailsView />);
