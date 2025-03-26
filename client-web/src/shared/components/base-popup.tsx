import styled, { css } from "styled-components";
import { Typography, type MapKeyToCss } from "@eggziom/geek-regime-js-ui-kit";

export type ElementPositionX = "left" | "center-right" | "center" | "center-left" | "right";

export type ElementPositionY = "bottom" | "top";

export type ElementPosition = [ElementPositionX, ElementPositionY];

export type BasePopupStyledProps = {
    hasGap?: boolean;
    position?: ElementPosition;
    view?: "dark";
};

const DROPDOWN_POSITION: ElementPosition = ["center-left", "bottom"];

const mapPositionXToCss: MapKeyToCss<ElementPositionX> = {
    center: css`
        left: 50%;
        transform: translateX(-50%);
    `,
    "center-left": css`
        right: 0;
    `,
    "center-right": css`
        left: 0;
    `,
    left: css`
        right: 100%;
    `,
    right: css`
        left: 100%;
    `,
};

const mapPositionYToCss: MapKeyToCss<ElementPositionY> = {
    bottom: css`
        top: 100%;
    `,
    top: css`
        bottom: 100%;
    `,
};

const mapViewToCss: MapKeyToCss<NonNullable<BasePopupStyledProps["view"]>> = {
    dark: css`
        padding: 0.5rem 0.7rem;
        background-color: ${({ theme }) => theme.colors.greyDarkest};

        ${Typography} {
            color: ${({ theme }) => theme.colors.white};
        }
    `,
};

export const BasePopup = styled.section<BasePopupStyledProps>`
    ${({
        theme,
        hasGap = false,
        position = DROPDOWN_POSITION,
        view,
    }) => css`
        position: absolute;
        z-index: ${theme.zIndex.modal};
        width: max-content;
        border-radius: 0.3rem;
        outline: none;
        ${view && mapViewToCss[view]};
        ${mapPositionXToCss[position[0]]}};
        ${mapPositionYToCss[position[1]]}};

        ${hasGap && css`
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        `};
    `};
`;
