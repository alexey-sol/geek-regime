import styled from "styled-components";

export const HeaderStyle = styled.header`
    ${({ theme }) => theme.mixins.gridLayout}
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const HeaderInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner}
    display: flex;
    box-sizing: border-box;
    padding: 1rem 0;
    justify-content: space-between;
`;
