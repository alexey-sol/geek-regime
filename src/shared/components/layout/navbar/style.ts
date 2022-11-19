import styled from "styled-components";

import { mixins } from "@/shared/style/mixins";

export const NavbarStyled = styled.nav`
    position: sticky;
    top: 0;
    z-index: ${({ theme }) => theme.zIndex.navbar};
    min-height: ${({ theme }) => theme.components.navbar.minHeight};
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`;

export const NavbarInnerStyled = styled.section`
    ${mixins.layoutRowInner};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ListStyled = styled.ul`
    display: flex;
`;

export const ActionsWrapStyled = styled.section`
    display: flex;
`;
