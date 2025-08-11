import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";

import { mixins } from "@/app/style/mixins";

export const HeaderStyled = styled.header`
    min-height: ${({ theme }) => theme.components.header.minHeight};
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const HeaderInnerStyled = styled.section`
    ${mixins.getLayoutRowInner()};
    display: flex;
    justify-content: space-between;
`;

export const TitleLinkStyled = styled(Link)`
    display: flex;
    align-items: center;

    ${Typography} {
        transition: color ${({ theme }) => theme.durations.normal} ease;
    }

    :hover {
        ${Typography} {
            color: ${({ theme }) => theme.colors.orangeLighten};
        }
    }
`;
