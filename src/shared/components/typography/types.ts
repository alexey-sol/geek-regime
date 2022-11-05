import { Font, HasColor, HasSize } from "@/shared/types/theme";

export type TypographyStyledProps = Partial<HasColor> & Partial<HasSize> & {
    font?: Font;
    variation?: "normal" | "caption" | "hint";
};
