import styled from "styled-components";
import { Link } from "react-router-dom";
import { TypographyStyled } from "@/shared/components/typography/style";
import {Button} from "@/shared/components/button";

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
        transition: color 100ms ease;
    }

    :hover {
        ${TypographyStyled} {
            color: ${({ theme }) => theme.colors.orangeLighten};
        }
    }
`;

export const LanguageSwitchWrapStyled = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
`;

export const LanguageSwitchStyled = styled(Button)`
    height: 100%;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    border-radius: 0;
    color: ${({ theme }) => theme.colors.white};
`;
