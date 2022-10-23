import React, { ReactNode } from "react";
import { Font, FontColor, FontSize } from "@/shared/types/theme";
import { Trans } from "react-i18next";
import { TypographyStyled } from "./style";

export type TypographyProps = {
    as?: "p" | "h1" | "h2" | "h3";
    children?: ReactNode;
    className?: string;
    color?: FontColor;
    font?: Font;
    i18nKey?: string;
    size?: FontSize;
};

export const Typography = ({
    as = "p",
    children,
    className,
    color,
    font,
    i18nKey,
    size,
}: TypographyProps) => {
    const text = (i18nKey)
        ? <Trans i18nKey={i18nKey}>{children}</Trans>
        : children;

    return (
        <TypographyStyled
            as={as}
            className={className}
            color={color}
            font={font}
            size={size}
        >
            {text}
        </TypographyStyled>
    );
};
