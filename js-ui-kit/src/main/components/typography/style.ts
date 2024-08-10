import styled, { css } from "styled-components";

import type { HasColor, HasFontSize } from "@/types/props";
import type { Font } from "@/types/theme";

export type TypographyStyledProps = Partial<HasColor> & Partial<HasFontSize> & {
    font?: Font;
};

export const TypographyStyled = styled.p<TypographyStyledProps>`
    ${({
        theme,
        color,
        font,
        fontSize,
    }) => css`
        font-family: ${theme.fonts.normal};
        font-size: ${theme.fontSizes.normal};
        color: ${theme.colors.greyDarkest};

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
