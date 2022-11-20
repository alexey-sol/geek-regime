import styled, { css } from "styled-components";

import { Typography } from "@/shared/components/typography";
import { mixins } from "@/app/style/mixins";

const columnCss = css`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const PostOverviewStyled = styled.article`
    ${columnCss};
`;

export const TwoLineTextStyled = styled(Typography)`
    ${mixins.twoLineText};
`;

export const BodyStyled = styled.section`
    ${columnCss};
`;

export const InfoContainerStyled = styled.section`
    display: flex;
`;
