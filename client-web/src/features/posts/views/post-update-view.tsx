import React, { type FC, memo } from "react";
import styled from "styled-components";

import { PostDraft } from "@/features/posts/components/post-draft";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";

export const PostUpdateViewStyled = styled.section`
    height: 100%;
`;

export const PostUpdateView: FC = () => {
    const { isPending, post } = useActivePost();

    return (
        <PostUpdateViewStyled>
            {isPending
                ? "loading..."
                : <PostDraft post={post} />}
        </PostUpdateViewStyled>
    );
};

export default memo(() => <PostUpdateView />);
