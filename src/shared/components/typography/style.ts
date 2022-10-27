import styled from "styled-components";
import { Font, FontColor, FontSize } from "@/shared/types/theme";

export const TypographyStyled = styled.p<{
    font?: Font;
    fontColor?: FontColor;
    fontSize?: FontSize;
}>`
    color: ${({ theme, fontColor }) => (fontColor
        ? theme.fontColors[fontColor]
        : theme.fontColors.normal)};
    font-family: ${({ theme, font }) => (font
        ? theme.fonts[font]
        : theme.fonts.normal)};
    font-size: ${({ theme, fontSize }) => (fontSize
        ? theme.fontSizes[fontSize]
        : theme.fontSizes.normal)};
`;
