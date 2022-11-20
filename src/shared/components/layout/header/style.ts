import styled from "styled-components";
import { Link } from "react-router-dom";

import { TypographyStyled } from "@/shared/components/typography/style";
import { mixins } from "@/app/style/mixins";

export const HeaderStyled = styled.header`
    min-height: ${({ theme }) => theme.components.header.minHeight};
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const HeaderInnerStyled = styled.section`
    ${mixins.layoutRowInner};
    display: flex;
    justify-content: space-between;
`;

export const TitleLinkStyled = styled(Link)`
    display: flex;
    align-items: center;

    ${TypographyStyled} {
        transition: color ${({ theme }) => theme.durations.normal} ease;
    }

    :hover {
        ${TypographyStyled} {
            color: ${({ theme }) => theme.colors.orangeLighten};
        }
    }
`;
