import styled, { css } from "styled-components";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

const oneLineTextCss = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const UserOverviewStyled = styled.article`
    display: flex;
    column-gap: 1rem;
`;

export const UserNameTitleStyled = styled(Typography)`
    transition: color ${({ theme }) => theme.durations.fast} ease;
    ${oneLineTextCss};

    &:hover {
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

export const OneLineTextStyled = styled(Typography)`
    ${oneLineTextCss};
`;

export const BodyStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    max-width: 100%;
`;
