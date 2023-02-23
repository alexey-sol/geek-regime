import React, { type FC, type HTMLAttributes } from "react";

import { TypographyStyled, type TypographyStyledProps } from "./style";

export type TypographyProps = HTMLAttributes<Omit<HTMLParagraphElement, "color">>
    & TypographyStyledProps;

export const Typography: FC<TypographyProps> = ({
    children,
    view,
    ...rest
}) => (
    <TypographyStyled
        as={view === "caption" ? "h2" : "p"}
        view={view}
        {...rest}
    >
        {children}
    </TypographyStyled>
);
