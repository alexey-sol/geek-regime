import styled from "styled-components";

export const HeaderStyled = styled.header`
    ${({ theme }) => theme.mixins.gridLayout}
    z-index: ${({ theme }) => theme.components.overlay.zIndex + 1};
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`;

export const HeaderInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner}
    display: flex;
    padding: 1rem 0;
    justify-content: space-between;
`;
