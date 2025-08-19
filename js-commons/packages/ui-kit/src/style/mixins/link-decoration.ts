import { css, type DefaultTheme, type FlattenInterpolation, type ThemeProps } from "styled-components";

import { Typography } from "@/components/typography";
import { type Color, type ColorValue, type MapKeyToCss } from "@/types/theme";
import { type HasColor } from "@/types/props";

export type LinkDecorationProps = Partial<HasColor> & {
    view?: "primary" | "secondary" | "plain";
};

const getColorCss = (color: Color | ColorValue) => css`
    &,
    ${Typography} {
        color: ${color};
    }
`;

const getMapViewToCss = (color?: Color): MapKeyToCss<NonNullable<LinkDecorationProps["view"]>> => ({
    plain: css(({ theme }) => getColorCss(color ?? theme.colors.greyDarkest)),
    primary: css(({ theme }) => getColorCss(color ?? theme.colors.purpleLight)),
    secondary: css(({ theme }) => getColorCss(color ?? theme.colors.secondary)),
});

export const getLinkDecoration = ({ color, view = "primary" }: LinkDecorationProps = {}): FlattenInterpolation<
    ThemeProps<DefaultTheme>
> => css`
    display: inline-block;
    width: fit-content;

    ${() =>
        view !== "plain" &&
        css`
            ${Typography} {
                transition: text-decoration ${({ theme }) => theme.durations.normal} ease;
                text-decoration: underline dashed;
                text-underline-offset: 0.5rem;

                &:hover {
                    text-decoration: none;
                }
            }
        `};

    ${getMapViewToCss(color)[view]};
`;
