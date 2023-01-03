import styled from "styled-components";

import { mixins } from "@/app/style/mixins";

export const MainStyled = styled.main`
    background-color: ${({ theme }) => theme.colors.white};
`;

export const MainInnerStyled = styled.section`
    ${mixins.getLayoutRowInner()};
    padding-top: ${({ theme }) => theme.components.main.paddingY};
    padding-bottom: ${({ theme }) => theme.components.main.paddingY};
`;
