import styled, { css } from "styled-components";

import type { Font, MapKeyToCss } from "@/shared/types/theme";
import type { HasColor, HasFontSize } from "@/shared/types/props";

export type TypographyStyledProps = Partial<HasColor> & Partial<HasFontSize> & {
    font?: Font;
    view?: "normal" | "caption" | "hint";
};

const mapViewToCss: MapKeyToCss<NonNullable<TypographyStyledProps["view"]>> = {
    caption: css`
        font-size: ${({ theme }) => theme.fontSizes.large};
        font-weight: bold;
    `,
    hint: css(({ theme }) => css`
        color: ${theme.colors.greyDarken};
        font-size: ${theme.fontSizes.small};
    `),
    normal: css`
        font-size: ${({ theme }) => theme.fontSizes.normal};
    `,
};

export const TypographyStyled = styled.p<TypographyStyledProps>`
    ${({
        theme,
        color,
        font,
        fontSize,
        view = "normal",
    }) => css`
        font-family: ${theme.fonts.normal};
        color: ${theme.colors.greyDarkest};
        ${mapViewToCss[view]};

        ${font && css`
            font-family: ${theme.fonts[font]};
        `};

        ${color && css`
            color: ${theme.colors[color]};
        `};

        ${fontSize && css`
            font-size: ${theme.fontSizes[fontSize]};
        `};
    `};
`;
