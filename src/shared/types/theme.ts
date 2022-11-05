import { theme } from "@/shared/style/theme";

export type Color = keyof typeof theme["colors"];

export type Duration = keyof typeof theme["durations"];

export type Font = keyof typeof theme["fonts"];

export type Size = keyof typeof theme["sizes"];

export type HasColor = { color: Color };

export type HasSize = { size: Size };
