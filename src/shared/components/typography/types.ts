import type { Font } from "@/shared/types/theme";
import type { HasColor, HasSize } from "@/shared/types/props";

export type TypographyStyledProps = Partial<HasColor> & Partial<HasSize> & {
    font?: Font;
    view?: "normal" | "caption" | "hint";
};
