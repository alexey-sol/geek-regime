import styled, {
    css, DefaultTheme, FlattenInterpolation, ThemeProps,
} from "styled-components";
import { TypographyStyledProps } from "@/shared/components/typography/types";

const mapVariationToCss: Record<
    NonNullable<TypographyStyledProps["variation"]>,
    FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
    caption: css`
        font-size: ${({ theme }) => theme.fontSizes.large};
        font-weight: bold;
    `,
    hint: css`
        color: ${({ theme }) => theme.colors.greyDarken};
        font-size: ${({ theme }) => theme.fontSizes.small};
    `,
    normal: css`
        font-size: ${({ theme }) => theme.fontSizes.normal};
    `,
};

export const TypographyStyled = styled.p<TypographyStyledProps>`
    font-family: ${({ theme }) => theme.fonts.normal};
    color: ${({ theme }) => theme.colors.greyDarkest};

    ${({ variation = "normal" }) => mapVariationToCss[variation]};

    ${({ theme, font }) => (font && css`
        font-family: ${theme.fonts[font]};
    `)};

    ${({ theme, fontColor }) => (fontColor && css`
        color: ${theme.colors[fontColor]};
    `)};

    ${({ theme, fontSize }) => (fontSize && css`
        font-size: ${theme.fontSizes[fontSize]};
    `)};
`;
