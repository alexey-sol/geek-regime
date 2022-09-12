import styled from "styled-components";
import { Font, FontSize } from "@/shared/types/theme";

export const TypographyStyled = styled.p<{
    font?: Font;
    size?: FontSize;
}>`
    font-family: ${({ theme, font }) => (font
        ? theme.fonts[font]
        : theme.fonts.normal)};
    font-size: ${({ theme, size }) => (size
        ? theme.fontSizes[size]
        : theme.fontSizes.normal)};
`;
