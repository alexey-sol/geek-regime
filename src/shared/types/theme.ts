import { theme } from "@/shared/style/theme";

export type Color = keyof typeof theme["colors"];

export type Font = keyof typeof theme["fonts"];

export type FontSize = keyof typeof theme["fontSizes"];
