import styled from "styled-components";

import { mixins } from "@/app/style/mixins";

export const FooterStyled = styled.footer`
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterInnerStyled = styled.section`
    ${mixins.getLayoutRowInner()};
    padding-top: ${({ theme }) => theme.components.footer.paddingY};
    padding-bottom: ${({ theme }) => theme.components.footer.paddingY};
    background-color: ${({ theme }) => theme.colors.secondary};
`;
