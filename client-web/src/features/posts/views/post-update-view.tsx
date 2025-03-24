import React, { type FC, memo } from "react";
import styled from "styled-components";

import { PostDraft } from "@/features/posts/components/post-draft";

export const PostUpdateViewStyled = styled.section`
    height: 100%;
`;

export const PostUpdateView: FC = () => (
    <PostUpdateViewStyled>
        <PostDraft />
    </PostUpdateViewStyled>
);

export default memo(() => <PostUpdateView />);
