import styled from "styled-components";

export const MainStyled = styled.main`
    ${({ theme }) => theme.mixins.gridLayout};
    background-color: ${({ theme }) => theme.colors.white};
`;

export const MainInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner};
    padding: ${({ theme }) => theme.components.main.paddingY} 0;
`;
