import styled from "styled-components";

import { TypographyStyled } from "@/shared/components/typography/style";

export const DialogStyled = styled.section`
    display: flex;
    flex-direction: column;
    width: 60rem;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.white};
    outline: none;
`;

export const HeaderStyled = styled.section`
    display: flex;
    justify-content: end;

    ${TypographyStyled} {
        flex: 1;
    }
`;
