import React from "react";
import { PostDraft } from "@/features/posts/components/post-draft";
import styled from "styled-components";

export const PostCreateViewStyled = styled.section`
    height: 100%;
`;

export const PostCreateView = () => (
    <PostCreateViewStyled>
        <PostDraft />
    </PostCreateViewStyled>
);

export default PostCreateView;
