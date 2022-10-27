import React, { ButtonHTMLAttributes } from "react";
import { ButtonStyledProps } from "@/shared/components/button/types";
import { Typography } from "@/shared/components/typography";
import { FontColor } from "@/shared/types/theme";
import { ButtonStyled } from "./style";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Partial<ButtonStyledProps>;

export const Button = ({
    children,
    isStretched = false,
    type = "button",
    variation = "light",
    ...rest
}: ButtonProps) => {
    const fontColor: FontColor = (variation === "dark")
        ? "white"
        : "normal";

    return (
        <ButtonStyled
            isStretched={isStretched}
            type={type}
            variation={variation}
            {...rest}
        >
            <Typography color={fontColor}>{children}</Typography>
        </ButtonStyled>
    );
};
