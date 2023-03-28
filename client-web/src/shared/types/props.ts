import React from "react";

import { Color, FontSize } from "@/shared/types/theme";

export type HasColor = { color: Color };

export type HasFontSize = { fontSize: FontSize };

export type HasElementRef = { elementRef: React.RefObject<HTMLElement> };
