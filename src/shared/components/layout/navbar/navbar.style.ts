import styled from "styled-components";

export const NavbarStyled = styled.nav`
    position: sticky;
    top: 0;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
    background-color: ${({ theme }) => theme.colors.tertiary};
`;

export const ListStyled = styled.ul`
    display: flex;
`;
