import React, {
    type FC, memo, useCallback, useState,
} from "react";
import styled from "styled-components";

import { PostDetails } from "@/features/posts/components/post-details";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { PostComments } from "@/features/posts/components/post-comments";
import { useInfiniteScroll } from "@/shared/utils/hooks/use-infinite-scroll";
import { ApiErrorMessage } from "@/shared/components/api-error-message";
import { createStubItem } from "@/shared/utils/helpers/object";

export const PostDetailsViewStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const PostDetailsView: FC = () => {
    const [showComments, setShowComments] = useState(false);
    const { errors, post } = useActivePost();

    const onLoadMore = useCallback(() => {
        setShowComments(true);
    }, []);

    const { sentryRef } = useInfiniteScroll({
        hasMore: Boolean(post) && !showComments,
        onLoadMore,
    });

    const itemOrStub = post ?? createStubItem();

    return (
        <PostDetailsViewStyled>
            {errors.get
                ? <ApiErrorMessage error={errors.get} />
                : <PostDetails post={itemOrStub} />}
            <section ref={sentryRef}>
                {showComments && <PostComments />}
            </section>
        </PostDetailsViewStyled>
    );
};

export default memo(() => <PostDetailsView />);
