import React, { memo } from "react";
import styled from "styled-components";

import { PostDraft } from "@/features/posts/components/post-draft";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";

export const PostUpdateViewStyled = styled.section`
    height: 100%;
`;

export const PostUpdateView = () => {
    const { isPending, post } = useActivePost();

    return (
        <PostUpdateViewStyled>
            {isPending
                ? "loading..."
                : <PostDraft post={post} />}
        </PostUpdateViewStyled>
    );
};

// eslint-disable-next-line import/no-default-export
export default memo(() => <PostUpdateView />);
