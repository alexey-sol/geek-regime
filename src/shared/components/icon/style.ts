import styled, { css } from "styled-components";
import { HasColor } from "@/shared/types/theme";

export const BaseIconStyled = styled.svg<Partial<HasColor>>`
    transition: inherit;

    path {
        ${({ theme, color }) => color && css`
            fill: ${theme.colors[color]};
        `};
    }
`;
