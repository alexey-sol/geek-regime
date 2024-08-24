import styled from "styled-components";

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
`;
