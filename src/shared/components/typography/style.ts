import styled from "styled-components";
import { Font, FontColor, FontSize } from "@/shared/types/theme";

export const TypographyStyled = styled.p<{
    color?: FontColor;
    font?: Font;
    size?: FontSize;
}>`
    color: ${({ theme, color }) => (color
        ? theme.fontColors[color]
        : theme.fontColors.normal)};
    font-family: ${({ theme, font }) => (font
        ? theme.fonts[font]
        : theme.fonts.normal)};
    font-size: ${({ theme, size }) => (size
        ? theme.fontSizes[size]
        : theme.fontSizes.normal)};
`;
