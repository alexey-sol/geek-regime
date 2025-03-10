import styled, { css } from "styled-components";

const columnCss = css`
    display: flex;
    flex-direction: column;
`;

export const PostDetailsStyled = styled.article`
    ${columnCss};
    row-gap: 2rem;
`;

export const UserNameWrap = styled.section`
    width: fit-content;
`;

export const ContentStyled = styled.article`
    ${columnCss};
    row-gap: 2rem;
`;

export const InfoStyled = styled.section`
    ${columnCss};
    row-gap: 0.5rem;
`;

export const ControlsWrap = styled.section`
    display: flex;
    column-gap: 1rem;
`;
