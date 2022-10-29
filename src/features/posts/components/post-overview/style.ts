import styled, { css } from "styled-components";
import { Typography } from "@/shared/components/typography";

const lineHeight = 1.2;
const lineCount = 2;

const columnCss = css`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const PostOverviewStyled = styled.article`
    ${columnCss};
`;

export const OneLineTextStyled = styled(Typography)`
    ${({ theme }) => theme.mixins.oneLineText};
`;

export const ExcerptStyled = styled(Typography)`
    position: relative;
    display: -webkit-box;
    max-width: 100%;
    max-height: calc(${({ theme }) => theme.fontSizes.normal} * ${lineCount} * ${lineHeight});
    line-height: ${lineHeight};
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const BodyStyled = styled.section`
    ${columnCss};
`;

export const InfoContainerStyled = styled.section`
    display: flex;
`;
