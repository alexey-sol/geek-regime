import styled from "styled-components";

export const LayoutStyled = styled.section`
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto auto 1fr auto;
    flex-direction: column;

    & ::selection {
        background-color: ${({ theme }) => theme.colors.orangeLight};
    }
`;
