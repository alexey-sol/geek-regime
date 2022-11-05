import styled from "styled-components";

export const NavbarStyled = styled.nav`
    ${({ theme }) => theme.mixins.gridLayout}
    position: sticky;
    top: 0;
    z-index: ${({ theme }) => theme.components.overlay.zIndex};
    min-height: ${({ theme }) => theme.components.navbar.minHeight};
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`;

export const NavbarInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner}
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
`;

export const ListStyled = styled.ul`
    display: flex;
`;

export const ActionsWrapStyled = styled.section`
    display: flex;
`;
