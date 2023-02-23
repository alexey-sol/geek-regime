import React, { type FC, memo } from "react";
import styled from "styled-components";

import { PostDraft } from "@/features/posts/components/post-draft";

export const PostCreateViewStyled = styled.section`
    height: 100%;
`;

export const PostCreateView: FC = () => (
    <PostCreateViewStyled>
        <PostDraft />
    </PostCreateViewStyled>
);

export default memo(() => <PostCreateView />);
