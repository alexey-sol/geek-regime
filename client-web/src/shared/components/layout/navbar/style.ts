import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";

import { mixins } from "@/app/style/mixins";

export const NavbarStyled = styled.nav`
    position: sticky;
    top: 0;
    z-index: ${({ theme }) => theme.zIndex.navbar};
    min-height: ${({ theme }) => theme.components.navbar.minHeight};
    background-color: ${({ theme }) => theme.colors.white};
    ${mixins.getWrapShadow()};
`;

export const NavbarInnerStyled = styled.section`
    ${mixins.getLayoutRowInner()};
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ListStyled = styled.ul`
    display: flex;
    gap: 1rem;
    height: 100%;
`;

type TabLinkStyledProps = {
    $isActive?: boolean;
};

export const TabLinkStyled = styled(Link)<TabLinkStyledProps>(
    ({ theme, $isActive }) => css`
        display: flex;
        align-items: center;
        height: 100%;

        ${Typography} {
            color: ${($isActive ? theme.colors.secondary : theme.colors.purpleDark)};
            font-weight: bold;
            transition: color ${theme.durations.fast} ease;
        }

        &:hover ${Typography} {
            color: ${!$isActive && theme.colors.purpleLight};
        }
    `,
);
