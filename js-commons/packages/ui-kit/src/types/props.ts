import type { AriaRole, RefObject } from "react";

import type { Color, FontSize } from "@/types/theme";

export type HasAriaRole = {
    role: AriaRole;
};

export type HasClassName = {
    className: string;
};

export type HasElementRef = {
    elementRef: RefObject<HTMLElement>;
};

export type HasColor = {
    color: Color;
};

export type HasFontSize = {
    fontSize: FontSize;
};

export type FontSizeOrSizeProp =
    | {
          fontSize?: FontSize;
          size?: never;
      }
    | {
          fontSize?: never;
          size?: string | number;
      };
