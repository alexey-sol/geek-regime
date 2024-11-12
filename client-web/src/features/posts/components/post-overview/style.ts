import styled, { css } from "styled-components";
import {
    Typography,
    type TypographyProps,
} from "@eggziom/geek-regime-js-ui-kit";

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

type TwoLineTextStyledProps = TypographyProps & {
    lineHeight?: string;
};

export const TwoLineTextStyled = styled(Typography)<TwoLineTextStyledProps>`
    ${({ lineHeight }) => lineHeight && mixins.getLineClampText(TWO_LINES, lineHeight)};
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

export const InfoWrapStyled = styled.section`
    display: flex;
`;
