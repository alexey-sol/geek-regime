import React from "react";

export type ElementPosition = "bottom-right" | "bottom-center";

export type BaseDropdownStyledProps = {
    anchorRef?: React.RefObject<HTMLElement>;
    position?: ElementPosition;
};
