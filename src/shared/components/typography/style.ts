import styled, {
    css, DefaultTheme, FlattenInterpolation, ThemeProps,
} from "styled-components";
import { TypographyStyledProps } from "./types";

const mapVariationToCss: Record<
    NonNullable<TypographyStyledProps["variation"]>,
    FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
    caption: css`
        font-size: ${({ theme }) => theme.sizes.large};
        font-weight: bold;
    `,
    hint: css`
        ${({ theme }) => css`
            color: ${theme.colors.greyDarken};
            font-size: ${theme.sizes.small};
        `};
    `,
    normal: css`
        font-size: ${({ theme }) => theme.sizes.normal};
    `,
};

export const TypographyStyled = styled.p<TypographyStyledProps>`
    ${({
        theme,
        color,
        font,
        size,
        variation = "normal",
    }) => css`
        font-family: ${theme.fonts.normal};
        color: ${theme.colors.greyDarkest};

        ${mapVariationToCss[variation]};

        ${font && css`
            font-family: ${theme.fonts[font]};
        `};

        ${color && css`
            color: ${theme.colors[color]};
        `};

        ${size && css`
            font-size: ${theme.sizes[size]};
        `};
    `};
`;
