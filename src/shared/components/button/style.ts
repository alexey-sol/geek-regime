import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import type { ColorValue, MapKeyToCss } from "@/shared/types/theme";

import { TypographyStyled } from "../typography/style";
import { BaseIconStyled } from "../icon/style";

import type { ButtonStyledProps } from "./types";

const PADDING_Y = "1rem";
const PLAIN_BORDER_WIDTH = "1px";

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
        ${getBgColorCss(colors.white, colors.orangeDark)}

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
    primary: css(({ theme }) => getBgColorCss(theme.colors.primary, theme.colors.purpleLight)),
    secondary: css(({ theme }) => getBgColorCss(theme.colors.secondary, theme.colors.orangeDark)),
    transparent: css(({ theme: { colors } }) => css`
        padding: 0;
        background-color: transparent;
        color: ${colors.primary};
        text-decoration: underline;
        text-decoration-style: dashed;
        text-underline-offset: 0.2rem;

        ${BaseIconStyled} {
            fill: ${colors.primary};
        };

        &:disabled {
            color: ${colors.primary};
        }

        &:not(:disabled):hover {
            color: ${colors.secondary};

            ${BaseIconStyled} {
                fill: ${colors.secondary};
            };
        }
    `),
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
        column-gap: 0.5rem;
        width: ${isStretched ? "100%" : "auto"};
        height: fit-content;
        padding: ${PADDING_Y} 2rem;
        border: none;
        border-radius: 0.3rem;
        user-select: none;
        color: ${theme.colors.white};
        cursor: pointer;

        &:hover {
            transition:
                border-color ${theme.durations.fast} ease,
                background-color ${theme.durations.fast} ease, 
                color ${theme.durations.fast} ease,
                fill ${theme.durations.fast} ease,
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
            opacity: 0.5;
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
