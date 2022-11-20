import React, { ButtonHTMLAttributes } from "react";

import { HasColor, HasSize } from "@/shared/types/theme";

import { BaseIconButtonProps } from "../icon-button";
import { Typography } from "../typography";
import type { TypographyStyledProps } from "../typography/types";

import { ButtonStyled, LinkStyled } from "./style";
import type { ButtonStyledProps } from "./types";

const INHERIT = "inherit";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
    & ButtonStyledProps
    & Partial<HasColor>
    & Partial<HasSize>
    & Partial<Pick<TypographyStyledProps, "font">>
    & Partial<Pick<BaseIconButtonProps, "icon">>;

export const Button = ({
    children,
    color = INHERIT,
    font = INHERIT,
    icon: Icon,
    size = "small",
    type = "button",
    ...rest
}: ButtonProps) => (
    <ButtonStyled type={type} {...rest}>
        {children && (
            <Typography
                color={color}
                font={font}
                size={size}
            >
                {children}
            </Typography>
        )}

        {Icon && <Icon size={size} />}
    </ButtonStyled>
);

export const LinkButton = (
    { to, ...rest }: ButtonProps & { to: string },
) => (
    <LinkStyled to={to}>
        <Button {...rest} />
    </LinkStyled>
);
