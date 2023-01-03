import styled, { css } from "styled-components";

const columnCss = css`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const PostListStyled = styled.section``;

export const ListStyled = styled.ul`
    ${columnCss};
`;

export const ListItemStyled = styled.li`
    ${columnCss};
`;
