import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components";
import { Link } from "react-router-dom";
import { TypographyStyled } from "@/shared/components/typography/style";
import { BaseIconStyled } from "@/shared/components/icon/style";
import { Color } from "@/shared/types/theme";
import { ButtonStyledProps } from "./types";

const paddingY = "1rem";
const plainBorderWidth = "1px";

const getBgColorCss = (bgColor: Color, bhColorOnHover: Color) => css`
    background-color: ${bgColor};

    &:not(:disabled):hover {
        background-color: ${bhColorOnHover};
    }
`;

const mapVariationToCss: Record<
    NonNullable<ButtonStyledProps["variation"]>,
    FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
    plain: css`
        ${({ theme }) => css`
            padding-top: calc(${paddingY} - ${plainBorderWidth});
            padding-bottom: calc(${paddingY} - ${plainBorderWidth});
            border: ${plainBorderWidth} solid ${theme.colors.primary};
            color: ${theme.colors.primary};
            ${getBgColorCss(theme.colors.white, theme.colors.orangeDark)}

            ${BaseIconStyled} {
                fill: ${theme.colors.primary};
            }

            &:disabled {
                color: ${theme.colors.primary};
            }

            &:not(:disabled):hover {
                border-color: ${theme.colors.orangeDark};
                color: ${theme.colors.white};

                ${BaseIconStyled} {
                    fill: ${theme.colors.white};
                }
            }
        `};
    `,
    primary: css`
        ${({ theme }) => getBgColorCss(theme.colors.primary, theme.colors.purpleLight)}};
    `,
    secondary: css`
        ${({ theme }) => getBgColorCss(theme.colors.secondary, theme.colors.orangeDark)};
    `,
    transparent: css`
      ${({ theme }) => css`
            padding: 0;
            background-color: transparent;
            color: ${theme.colors.primary};
            text-decoration: underline;
            text-decoration-style: dashed;
            text-underline-offset: 0.2rem;

            ${BaseIconStyled} {
                fill: ${theme.colors.primary};
            };

            &:disabled {
                color: ${theme.colors.primary};
            }

            &:not(:disabled):hover {
                color: ${theme.colors.secondary};

                ${BaseIconStyled} {
                    fill: ${theme.colors.secondary};
                };
            }
        `};
    `,
};

export const ButtonStyled = styled.button<ButtonStyledProps>(
    ({
        theme,
        isStretched = false,
        variation = "primary",
    }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 0.5rem;
        width: ${isStretched ? "100%" : "auto"};
        height: fit-content;
        padding: ${paddingY} 2rem;
        border: none;
        border-radius: 0.3rem;
        user-select: none;
        color: ${theme.colors.white};
        cursor: pointer;
        transition:
            border-color ${theme.durations.fast} ease,
            background-color ${theme.durations.fast} ease, 
            color ${theme.durations.fast} ease,
            fill ${theme.durations.fast} ease,
            opacity ${theme.durations.normal} ease;

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

        ${mapVariationToCss[variation]};
    `,
);

export const LinkStyled = styled(Link)`
    display: inline-block;
    width: fit-content;
`;
