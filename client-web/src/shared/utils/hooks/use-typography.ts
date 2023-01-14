import { useTheme } from "styled-components";

import type { HasFontSize } from "@/shared/types/props";
import type { FontSize } from "@/shared/types/theme";

const NORMAL_LINE_HEIGHT_COEF = 1.4;

const mapSizeToLineHeightCoef: Partial<Record<FontSize, number>> = { // [1]
    large: 1.2,
    normal: NORMAL_LINE_HEIGHT_COEF,
};

export const useTypography = ({ fontSize = "normal" }: HasFontSize) => {
    const theme = useTheme();

    const lineHeightCoef = mapSizeToLineHeightCoef[fontSize] ?? NORMAL_LINE_HEIGHT_COEF;
    const lineHeightAsNumber = parseFloat(theme.fontSizes[fontSize]) * lineHeightCoef;
    const lineHeight = `${lineHeightAsNumber}rem`;

    return { lineHeight };
};

// [1]. "How to identify line height and line length"
// https://banc.digital/blog/typography-font-sizes-styles-formats
