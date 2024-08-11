import { useTheme } from "styled-components";
import type { FontSize, HasFontSize } from "@eggziom/geek-regime-js-ui-kit";

const NORMAL_LINE_HEIGHT_COEF = 1.4;

const mapSizeToLineHeightCoef: Partial<Record<FontSize, number>> = { // [1]
    lg: 1.2,
    md: NORMAL_LINE_HEIGHT_COEF,
};

export type UseTypographyResult = {
    lineHeight: string;
};

export const useTypography = ({ fontSize = "md" }: HasFontSize): UseTypographyResult => {
    const theme = useTheme();

    const lineHeightCoef = mapSizeToLineHeightCoef[fontSize] ?? NORMAL_LINE_HEIGHT_COEF;
    const lineHeightAsNumber = parseFloat(theme.fontSizes[fontSize]) * lineHeightCoef;
    const lineHeight = `${lineHeightAsNumber}rem`;

    return { lineHeight };
};

// [1]. "How to identify line height and line length"
// https://banc.digital/blog/typography-font-sizes-styles-formats
