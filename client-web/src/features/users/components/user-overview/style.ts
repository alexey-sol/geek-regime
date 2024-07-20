import styled, { css } from "styled-components";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

const columnCss = css`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const PostOverviewStyled = styled.article`
    ${columnCss};
`;

export const OneLineTextStyled = styled(Typography)`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const BodyStyled = styled.section`
    ${columnCss};
`;
