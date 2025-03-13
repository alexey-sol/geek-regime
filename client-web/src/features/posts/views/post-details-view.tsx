import React, {
    type FC, memo, useCallback, useState,
} from "react";
import styled from "styled-components";

import { PostDetails } from "@/features/posts/components/post-details";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { PostComments } from "@/features/posts/components/post-comments";
import { useInfiniteScroll } from "@/shared/utils/hooks/use-infinite-scroll";
import { ApiErrorMessage } from "@/shared/components/api-error-message";

export const PostDetailsViewStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const PostDetailsView: FC = () => {
    const [showComments, setShowComments] = useState(false);
    const { errors, pending, post } = useActivePost();

    const onLoadMore = useCallback(() => {
        setShowComments(true);
    }, []);

    const { sentryRef } = useInfiniteScroll({
        hasMore: Boolean(post) && !showComments,
        onLoadMore,
    });

    return (
        <PostDetailsViewStyled>
            {Boolean(pending) && "loading..."}
            {post && <PostDetails post={post} />}
            {!!errors.get && <ApiErrorMessage error={errors.get} />}
            <section ref={sentryRef}>
                {showComments && <PostComments />}
            </section>
        </PostDetailsViewStyled>
    );
};

export default memo(() => <PostDetailsView />);
