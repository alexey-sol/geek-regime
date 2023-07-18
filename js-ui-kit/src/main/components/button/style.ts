import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { baseMixins } from "@/style/mixins";
import type { ColorValue, MapKeyToCss } from "@/types/theme";

import { TypographyStyled } from "../typography/style";
import { BaseIconStyled } from "../icon/style";

const PADDING_Y = "1rem";
const PLAIN_BORDER_WIDTH = "1px";

export type ButtonStyledProps = {
    isStretched?: boolean;
    view?: "primary" | "secondary" | "plain" | "transparent";
};

const getBgColorCss = (bgColor: ColorValue, bgColorOnHover: ColorValue) => css`
    background-color: ${bgColor};

    &:not(:disabled):hover {
        background-color: ${bgColorOnHover};
    }
`;

const mapViewToCss: MapKeyToCss<NonNullable<ButtonStyledProps["view"]>> = {
    plain: css(({ theme: { colors } }) => css`
        padding-top: calc(${PADDING_Y} - ${PLAIN_BORDER_WIDTH});
        padding-bottom: calc(${PADDING_Y} - ${PLAIN_BORDER_WIDTH});
        border: ${PLAIN_BORDER_WIDTH} solid ${colors.primary};
        color: ${colors.primary};
        ${getBgColorCss(colors.white, colors.orangeDark)};

        ${BaseIconStyled} {
            fill: ${colors.primary};
        }

        &:disabled {
            color: ${colors.primary};
        }

        &:not(:disabled):hover {
            border-color: ${colors.orangeDark};
            color: ${colors.white};

            ${BaseIconStyled} {
                fill: ${colors.white};
            }
        }
    `),
    primary: css(({ theme }) => getBgColorCss(theme.colors.purpleLight, theme.colors.primary)),
    secondary: css(({ theme }) => getBgColorCss(theme.colors.secondary, theme.colors.orangeDark)),
    transparent: css`
        padding: 0;
        background-color: transparent;
        ${baseMixins.getLinkDecoration()};
    `,
};

export const ButtonStyled = styled.button<ButtonStyledProps>(
    ({
        theme,
        isStretched = false,
        view = "primary",
    }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 1rem;
        width: ${isStretched ? "100%" : "fit-content"};
        height: fit-content;
        padding: ${PADDING_Y} 2rem;
        border: none;
        border-radius: 0.3rem;
        user-select: none;
        color: ${theme.colors.white};
        cursor: pointer;

        &:hover {
            transition:
                border-color ${theme.durations.normal} ease,
                background-color ${theme.durations.normal} ease, 
                color ${theme.durations.normal} ease,
                fill ${theme.durations.normal} ease,
                opacity ${theme.durations.normal} ease;
        }

        ${TypographyStyled} {
            overflow-x: hidden;
            text-overflow: ellipsis;
        }

        ${BaseIconStyled} {
            fill: ${theme.colors.white};
        }

        &:disabled {
            opacity: 0.8;
            color: ${theme.colors.white};
            cursor: default;
        }

        ${mapViewToCss[view]};
    `,
);

export const LinkStyled = styled(Link)`
    display: inline-block;
    width: fit-content;
`;
