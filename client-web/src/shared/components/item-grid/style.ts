import styled from "styled-components";

export const ItemGridStyled = styled.section`
    width: 100%;
`;

export const GridStyled = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
    }
`;
