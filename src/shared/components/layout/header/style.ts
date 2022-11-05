import styled from "styled-components";
import { Link } from "react-router-dom";
import { TypographyStyled } from "@/shared/components/typography/style";

export const HeaderStyled = styled.header`
    ${({ theme }) => theme.mixins.gridLayout};
    min-height: ${({ theme }) => theme.components.header.minHeight};
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const HeaderInnerStyled = styled.section`
    ${({ theme }) => theme.mixins.gridLayoutInner}
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TitleLinkStyled = styled(Link)`
    ${TypographyStyled} {
        transition: color ${({ theme }) => theme.durations.normal} ease;
    }

    :hover {
        ${TypographyStyled} {
            color: ${({ theme }) => theme.colors.orangeLighten};
        }
    }
`;
