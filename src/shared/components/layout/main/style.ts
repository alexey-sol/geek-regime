import styled from "styled-components";

import { mixins } from "@/shared/style/mixins";

export const MainStyled = styled.main`
    background-color: ${({ theme }) => theme.colors.white};
`;

export const MainInnerStyled = styled.section`
    ${mixins.layoutRowInner};
    padding-top: ${({ theme }) => theme.components.main.paddingY};
    padding-bottom: ${({ theme }) => theme.components.main.paddingY};
`;
