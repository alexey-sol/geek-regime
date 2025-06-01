import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { TagStyled } from "@/shared/components/tag";

export const SpaceOverviewStyled = styled(TagStyled)`
    display: flex;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: ${({ theme, color }) => theme.colors[color]};
`;

export const LinkStyled = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

export const BodyStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    flex: 1;
`;

export const NoWrapTypography = styled(Typography)`
    text-wrap: nowrap;
`;
