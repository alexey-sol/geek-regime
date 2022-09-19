import React, { ReactNode } from "react";
import { Font, FontColor, FontSize } from "@/shared/types/theme";
import { TypographyStyled } from "./typography.style";

export type TypographyProps = {
    as?: "p" | "h1" | "h2";
    children: ReactNode;
    color?: FontColor;
    font?: Font;
    size?: FontSize;
};

export const Typography = ({
    as = "p",
    children,
    color,
    font,
    size,
}: TypographyProps) => (
    <TypographyStyled
        as={as}
        color={color}
        font={font}
        size={size}
    >
        {children}
    </TypographyStyled>
);
