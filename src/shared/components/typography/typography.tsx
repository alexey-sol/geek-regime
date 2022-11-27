import React, { HTMLAttributes } from "react";

import type { TypographyStyledProps } from "./types";
import { TypographyStyled } from "./style";

export type TypographyProps = HTMLAttributes<Omit<HTMLParagraphElement, "color">>
    & TypographyStyledProps;

export const Typography = ({
    children,
    view,
    ...rest
}: TypographyProps) => (
    <TypographyStyled
        as={view === "caption" ? "h2" : "p"}
        view={view}
        {...rest}
    >
        {children}
    </TypographyStyled>
);
