import styled from "styled-components";

export const LayoutStyled = styled.section`
    display: grid;
    height: 100vh;
    grid-template-rows: auto auto 1fr auto;

    & ::selection {
        background-color: ${({ theme }) => theme.colors.orangeLight};
    }
`;
