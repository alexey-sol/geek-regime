import styled, { css } from "styled-components";

import { Typography } from "@/shared/components/typography";
import { mixins } from "@/app/style/mixins";

const TWO_LINES = 2;

const columnCss = css`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const PostOverviewStyled = styled.article`
    ${columnCss};
`;

export const TwoLineTextStyled = styled(Typography)<{ lineHeight?: string }>`
    ${({ lineHeight }) => lineHeight && mixins.getLineClampText(TWO_LINES, lineHeight)};
`;

export const BodyStyled = styled.section`
    ${columnCss};
`;

export const InfoContainerStyled = styled.section`
    display: flex;
`;
