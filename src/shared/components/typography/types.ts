import { Font, FontColor, FontSize } from "@/shared/types/theme";

export type TypographyStyledProps = {
    font?: Font;
    fontColor?: FontColor;
    fontSize?: FontSize;
    variation?: "normal" | "caption" | "hint";
};
