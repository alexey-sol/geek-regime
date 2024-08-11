import type { HTMLAttributes } from "react";

import type { HasColor, HasFontSize } from "@/types/props";
import type { Font } from "@/types/theme";

export type TypographyTagName = Extract<keyof HTMLElementTagNameMap, "blockquote"
    | "code"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "pre"
    | "span"
>;

export type TypographyProps = HTMLAttributes<Omit<HTMLParagraphElement, "color">>
    & Partial<HasColor>
    & Partial<HasFontSize>
    & {
    as?: TypographyTagName;
    font?: Font;
};
