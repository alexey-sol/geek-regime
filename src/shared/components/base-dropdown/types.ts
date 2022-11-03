import React from "react";

export type ElementPosition = "top" | "right" | "bottom" | "left";

export type BaseDropdownStyledProps = {
    anchorRef?: React.RefObject<HTMLElement>;
    position?: ElementPosition;
    variation?: "plain" | "primary";
};
