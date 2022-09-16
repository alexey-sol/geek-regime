import styled from "styled-components";

export const NavbarStyled = styled.nav`
    ${({ theme }) => theme.mixins.gridLayout}
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.colors.tertiary};
`;

export const NavbarInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner}
    display: flex;
    box-sizing: border-box;
    padding: 1rem 0;
`;

export const ListStyled = styled.ul`
    display: flex;
`;
