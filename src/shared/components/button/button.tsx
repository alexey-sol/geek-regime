import React, { ButtonHTMLAttributes } from "react";
import { ButtonStyledProps } from "@/shared/components/button/types";
import { Typography } from "@/shared/components/typography";
import { ButtonStyled, LinkStyled } from "./style";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Partial<ButtonStyledProps>;

export const Button = ({
    children,
    isStretched = false,
    type = "button",
    variation = "light",
    ...rest
}: ButtonProps) => (
    <ButtonStyled
        isStretched={isStretched}
        type={type}
        variation={variation}
        {...rest}
    >
        <Typography fontColor={(variation === "dark") ? "white" : "normal"}>
            {children}
        </Typography>
    </ButtonStyled>
);

export const LinkButton = ({ to, ...rest }: ButtonProps & { to: string }) => (
    <LinkStyled to={to}>
        <Button {...rest} />
    </LinkStyled>
);
