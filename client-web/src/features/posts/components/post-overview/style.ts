import styled, { css } from "styled-components";

const columnCss = css`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const PostOverviewStyled = styled.article`
    ${columnCss};
`;

export const BodyStyled = styled.section`
    ${columnCss};

    & :first-child {
        transition: color ${({ theme }) => theme.durations.fast} ease;
    }

    &:hover :first-child {
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

export const PostOverviewFooter = styled.section`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
`;
