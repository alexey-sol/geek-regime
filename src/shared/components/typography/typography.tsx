import React, { ReactNode } from "react";
import { Font, FontSize } from "@/shared/types/theme";
import { TypographyStyled } from "./typography.style";

export type TypographyProps = {
    as?: "p" | "h1" | "h2";
    children: ReactNode;
    font?: Font;
    size?: FontSize;
}

export const Typography = ({
    as = "p",
    children,
    font,
    size,
}: TypographyProps) => (
    <TypographyStyled as={as} font={font} size={size}>
        {children}
    </TypographyStyled>
);
