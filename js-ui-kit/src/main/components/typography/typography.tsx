import React, { type FC, type HTMLAttributes } from "react";

import { TypographyStyled, type TypographyStyledProps } from "./style";

export type TypographyProps = HTMLAttributes<Omit<HTMLParagraphElement, "color">>
    & TypographyStyledProps & {
    as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Typography: FC<TypographyProps> = ({
    as: tagName = "p",
    children,
    ...rest
}) => (
    <TypographyStyled
        as={tagName}
        {...rest}
    >
        {children}
    </TypographyStyled>
);
