import styled from "styled-components";

export const FooterStyled = styled.footer`
    ${({ theme }) => theme.mixins.gridLayout}
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner}
    padding: 1rem 0;
    background-color: ${({ theme }) => theme.colors.secondary};
`;
