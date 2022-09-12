import styled from "styled-components";

export const HeaderStyle = styled.nav`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const ContentStyled = styled.section`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
`;
