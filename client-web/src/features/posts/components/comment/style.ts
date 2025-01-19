import styled, { css } from "styled-components";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

export const CommentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;

export const CommentFooterStyled = styled.section`
    display: flex;
    gap: 1rem;
`;

export const BodyTypographyStyled = styled(Typography)<{ isHighlighted?: boolean }>(
    ({ isHighlighted, theme }) => isHighlighted && css`
        background-color: ${theme.colors.orangeLighten};
        border-radius: 0.3rem;
    `,
);
