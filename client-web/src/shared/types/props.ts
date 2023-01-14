import { ReactNode } from "react";

import { Color, FontSize } from "@/shared/types/theme";

export type HasId<Value extends number | string = number> = {
    id: Value;
};

export type HasChildren = { children: ReactNode };

export type HasColor = { color: Color };

export type HasFontSize = { fontSize: FontSize };
