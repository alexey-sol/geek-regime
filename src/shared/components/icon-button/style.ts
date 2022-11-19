import styled, { css } from "styled-components";

import { BaseIconStyled } from "@/shared/components/icon/style";
import { ColorValue, MapKeyToCss } from "@/shared/types/theme";

import { BaseIconButtonStyledProps } from "./types";

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

const mapVariationToCss: MapKeyToCss<NonNullable<BaseIconButtonStyledProps["variation"]>> = {
    light: css`
        ${({ theme }) => getFillCss(theme.colors.white, theme.colors.orangeLighten)}};
    `,
    primary: css`
        ${({ theme }) => getFillCss(theme.colors.primary, theme.colors.secondary)}};
    `,
};

export const IconButtonStyled = styled.button<BaseIconButtonStyledProps>(
    ({ theme, variation = "primary" }) => css`
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

        ${mapVariationToCss[variation]};
    `,
);
