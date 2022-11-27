import styled, { css } from "styled-components";

import type { HasColor } from "@/shared/types/props";

export const BaseIconStyled = styled.svg<Partial<HasColor>>`
    transition: inherit;

    path {
        ${({ theme, color }) => color && css`
            fill: ${theme.colors[color]};
        `};
    }
`;
