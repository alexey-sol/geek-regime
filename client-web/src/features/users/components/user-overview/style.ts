import styled, { css } from "styled-components";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { Link } from "react-router-dom";

const oneLineTextCss = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const UserNameTitleStyled = styled(Typography)`
    transition: color ${({ theme }) => theme.durations.fast} ease;
    ${oneLineTextCss};
`;

export const LinkStyled = styled(Link)`
    display: flex;
    column-gap: 1rem;

    &:hover ${UserNameTitleStyled} {
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
