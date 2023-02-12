import styled, { css } from "styled-components";

import { BaseIconStyled } from "@/shared/components/icon/style";
import { mixins } from "@/app/style/mixins";
import type { MapKeyToCss } from "@/shared/types/theme";

import type { BaseIconButtonStyledProps } from "./base-icon-button";

const mapViewToCss: MapKeyToCss<NonNullable<BaseIconButtonStyledProps["view"]>> = {
    primary: css(({ theme }) => mixins.getIconFill(theme.colors.primary, theme.colors.secondary)),
    white: css(({ theme }) => mixins.getIconFill(theme.colors.white, theme.colors.orangeLighten)),
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
