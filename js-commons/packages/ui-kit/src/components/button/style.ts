import styled, { css } from "styled-components";

import { Typography } from "../typography";
import { BaseIconStyled } from "../icon/style";

import { BaseButton } from "./base-button";

import { type ColorValue, type MapKeyToCss } from "@/types/theme";
import { baseMixins } from "@/style/mixins";
import { type LinkDecorationProps } from "@/style/mixins/link-decoration";

const PADDING_Y = "1rem";
const PLAIN_BORDER_WIDTH = "1px";

export type ButtonStyledProps = {
    isStretched?: boolean;
    view?: "primary" | "secondary" | "plain";
};

const getBgColorCss = (bgColor: ColorValue, bgColorOnHover: ColorValue) => css`
    background-color: ${bgColor};

    &:not(:disabled):hover {
        background-color: ${bgColorOnHover};
    }
`;

const mapViewToCss: MapKeyToCss<NonNullable<ButtonStyledProps["view"]>> = {
    plain: css(
        ({ theme: { colors } }) => css`
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
        `,
    ),
    primary: css(({ theme }) => getBgColorCss(theme.colors.purpleLight, theme.colors.primary)),
    secondary: css(({ theme }) => getBgColorCss(theme.colors.secondary, theme.colors.orangeDark)),
};

export const ButtonStyled = styled(BaseButton)<ButtonStyledProps>(
    ({ theme, isStretched = false, view = "primary" }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 1rem;
        width: ${isStretched ? "100%" : "fit-content"};
        height: fit-content;
        padding: ${PADDING_Y} 2rem;
        border-radius: 0.3rem;
        color: ${theme.colors.white};

        &:disabled {
            color: ${theme.colors.white};
        }

        ${Typography} {
            overflow-x: hidden;
            text-overflow: ellipsis;
        }

        ${BaseIconStyled} {
            fill: ${theme.colors.white};
        }

        ${mapViewToCss[view]};
    `,
);

export const LinkButtonStyled = styled(BaseButton)<LinkDecorationProps>`
    padding: 0;
    background-color: transparent;
    ${(props) => baseMixins.getLinkDecoration(props)};
`;
