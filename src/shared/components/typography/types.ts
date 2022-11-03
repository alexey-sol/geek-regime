import { Color, Font, FontSize } from "@/shared/types/theme";

export type TypographyStyledProps = {
    font?: Font;
    fontColor?: Color;
    fontSize?: FontSize;
    variation?: "normal" | "caption" | "hint";
};
