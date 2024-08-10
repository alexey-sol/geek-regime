import {
    css, type DefaultTheme, type FlattenInterpolation, type ThemeProps,
} from "styled-components";

import { TypographyStyled } from "@/components/typography";
import { type Color, type ColorValue, type MapKeyToCss } from "@/types/theme";
import { type HasColor } from "@/types/props";

export type LinkDecorationProps = Partial<HasColor> & {
    view?: "primary" | "secondary";
};

const getColorCss = (color: Color | ColorValue) => css`
    &, ${TypographyStyled} {
        color: ${color};
    }

    &:not(:disabled):hover {
        &, ${TypographyStyled} {
            filter: contrast(130%) brightness(113%);
        }
    }
`;

const getMapViewToCss = (color?: Color): MapKeyToCss<NonNullable<LinkDecorationProps["view"]>> => ({
    primary: css(({ theme }) => getColorCss(color ?? theme.colors.purpleLight)),
    secondary: css(({ theme }) => getColorCss(color ?? theme.colors.secondary)),
});

export const getLinkDecoration = ({
    color,
    view = "primary",
}: LinkDecorationProps = {}): FlattenInterpolation<ThemeProps<DefaultTheme>> => css`
    display: inline-block;
    width: fit-content;

    ${TypographyStyled} {
        transition:
                color ${({ theme }) => theme.durations.normal} ease,
                filter ${({ theme }) => theme.durations.normal} ease;
        text-decoration: underline dashed;
        text-underline-offset: 0.5rem;
    }

    ${getMapViewToCss(color)[view]};
`;
