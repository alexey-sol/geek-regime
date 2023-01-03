import styled, { css } from "styled-components";

import { BaseIconStyled } from "@/shared/components/icon/style";
import type { ColorValue, MapKeyToCss } from "@/shared/types/theme";

import type { BaseIconButtonStyledProps } from "./types";

const getFillCss = (fill: ColorValue, fillOnHover: ColorValue) => css`
    ${BaseIconStyled} {
        fill: ${fill};
    }

    &:hover {
        ${BaseIconStyled} {
            fill: ${fillOnHover};
        }
    }
`;

const mapViewToCss: MapKeyToCss<NonNullable<BaseIconButtonStyledProps["view"]>> = {
    primary: css(({ theme }) => getFillCss(theme.colors.primary, theme.colors.secondary)),
    white: css(({ theme }) => getFillCss(theme.colors.white, theme.colors.orangeLighten)),
};

export const IconButtonStyled = styled.button<BaseIconButtonStyledProps>(
    ({ theme, view = "primary" }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;

        ${BaseIconStyled} {
            transition: fill ${theme.durations.normal} ease;
        }

        ${mapViewToCss[view]};
    `,
);
