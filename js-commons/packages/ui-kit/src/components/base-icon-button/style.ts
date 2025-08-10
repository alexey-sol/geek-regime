import styled, { css } from "styled-components";

import type { BaseIconButtonStyledProps } from "./base-icon-button";

import { baseMixins } from "@/style/mixins";
import { BaseIconStyled } from "@/components/icon";
import type { MapKeyToCss } from "@/types/theme";

const mapViewToCss: MapKeyToCss<NonNullable<BaseIconButtonStyledProps["view"]>> = {
    primary: css(({ theme }) => baseMixins.getIconFill(theme.colors.primary, theme.colors.secondary)),
    white: css(({ theme }) => baseMixins.getIconFill(theme.colors.white, theme.colors.orangeLighten)),
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
