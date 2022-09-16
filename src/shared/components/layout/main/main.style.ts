import styled from "styled-components";

export const MainStyled = styled.main`
    ${({ theme }) => theme.mixins.gridLayout}
`;

export const MainInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner}
`;
