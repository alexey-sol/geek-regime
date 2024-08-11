import { type TypographyTagName } from "@/components/typography/types";
import { type FontSize } from "@/types/theme";

export const mapTagNameToFontSize: Partial<Record<TypographyTagName, FontSize>> = {
    h1: "xxl",
    h2: "xl",
    h3: "lg",
    h4: "md",
    h5: "sm",
    h6: "xs",
};
