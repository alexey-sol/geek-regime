import React, { type ButtonHTMLAttributes, type FC } from "react";

import type { HasColor, HasFontSize } from "@/types/props";

import { Typography, type TypographyStyledProps } from "../typography";
import type { BaseIconButtonProps } from "../icon-button";

import { ButtonStyled, LinkStyled, type ButtonStyledProps } from "./style";

const INHERIT = "inherit";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
    & ButtonStyledProps
    & Partial<HasColor>
    & Partial<HasFontSize>
    & Partial<Pick<TypographyStyledProps, "font">>
    & Partial<Pick<BaseIconButtonProps, "icon">>;

export const Button: FC<ButtonProps> = ({
    children,
    color = INHERIT,
    font = INHERIT,
    fontSize = "small",
    icon: Icon,
    type = "button",
    ...rest
}) => (
    <ButtonStyled type={type} {...rest}>
        {children && (
            <Typography
                color={color}
                font={font}
                fontSize={fontSize}
            >
                {children}
            </Typography>
        )}

        {Icon && <Icon fontSize={fontSize} />}
    </ButtonStyled>
);

export const LinkButton: FC<ButtonProps & { to: string }> = ({ to, ...rest }) => (
    <LinkStyled to={to}>
        <Button {...rest} />
    </LinkStyled>
);
