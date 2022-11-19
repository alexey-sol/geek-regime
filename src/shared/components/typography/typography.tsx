import React, { HTMLAttributes } from "react";

import { TypographyStyledProps } from "./types";
import { TypographyStyled } from "./style";

export type TypographyProps = HTMLAttributes<Omit<HTMLParagraphElement, "color">>
    & TypographyStyledProps;

export const Typography = ({
    children,
    variation,
    ...rest
}: TypographyProps) => (
    <TypographyStyled
        as={variation === "caption" ? "h2" : "p"}
        variation={variation}
        {...rest}
    >
        {children}
    </TypographyStyled>
);
