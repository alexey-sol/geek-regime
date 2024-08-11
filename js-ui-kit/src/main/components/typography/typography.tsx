import styled, { css } from "styled-components";

import { TypographyProps } from "./types";
import { mapTagNameToFontSize } from "./utils";

export const Typography = styled.p<TypographyProps>`
    ${({
        as: tagName,
        theme,
        color,
        font,
        fontSize,
    }) => css`
        font-family: ${theme.fonts.normal};
        font-size: ${theme.fontSizes[(tagName && mapTagNameToFontSize[tagName]) ?? "md"]};
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
