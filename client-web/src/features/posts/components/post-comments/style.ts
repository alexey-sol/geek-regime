import styled from "styled-components";

import { commentListLayoutCss } from "../parent-comment/style";

export const CommentListStyled = styled.ul`
    ${commentListLayoutCss};
`;

export const PostCommentsStyled = styled.section`
    ${commentListLayoutCss};
`;

export const PostCommentsHeaderStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
`;
