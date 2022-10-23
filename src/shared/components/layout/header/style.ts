import styled from "styled-components";

export const HeaderStyled = styled.header`
    ${({ theme }) => theme.mixins.gridLayout}
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const HeaderInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner}
    display: flex;
    padding: 1rem 0;
    justify-content: space-between;
`;
