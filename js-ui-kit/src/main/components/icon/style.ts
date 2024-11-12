import styled, { css } from "styled-components";

import type { HasColor } from "@/types/props";

export const BaseIconStyled = styled.svg<Partial<HasColor>>`
    display: flex;
    transition: inherit;

    path {
        ${({ theme, color }) => color && css`
            fill: ${theme.colors[color]};
        `};
    }
`;
