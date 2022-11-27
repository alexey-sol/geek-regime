import { useTheme } from "styled-components";

import type { HasSize } from "@/shared/types/props";
import type { Size } from "@/shared/types/theme";

const NORMAL_LINE_HEIGHT_COEF = 1.4;

const mapSizeToLineHeightCoef: Partial<Record<Size, number>> = { // [1]
    large: 1.2,
    normal: NORMAL_LINE_HEIGHT_COEF,
};

export const useTypography = ({ size = "normal" }: HasSize) => {
    const theme = useTheme();

    const lineHeightCoef = mapSizeToLineHeightCoef[size] ?? NORMAL_LINE_HEIGHT_COEF;
    const lineHeightAsNumber = parseFloat(theme.sizes[size]) * lineHeightCoef;
    const lineHeight = `${lineHeightAsNumber}rem`;

    return { lineHeight };
};

// [1]. "How to identify line height and line length"
// https://banc.digital/blog/typography-font-sizes-styles-formats
