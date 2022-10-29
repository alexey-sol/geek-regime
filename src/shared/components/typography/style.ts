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
        color: ${({ theme }) => theme.fontColors.grey};
        font-size: ${({ theme }) => theme.fontSizes.small};
    `,
    normal: css`
        font-size: ${({ theme }) => theme.fontSizes.normal};
    `,
};

export const TypographyStyled = styled.p<TypographyStyledProps>`
    font-family: ${({ theme }) => theme.fonts.normal};
    color: ${({ theme }) => theme.fontColors.normal};

    ${({ variation = "normal" }) => mapVariationToCss[variation]};

    ${({ theme, font }) => (font && css`
        font-family: ${theme.fonts[font]};
    `)};

    ${({ theme, fontColor }) => (fontColor && css`
        color: ${theme.fontColors[fontColor]};
    `)};

    ${({ theme, fontSize }) => (fontSize && css`
        size: ${theme.fontSizes[fontSize]};
    `)};
`;
