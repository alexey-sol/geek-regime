import React, { ButtonHTMLAttributes } from "react";

import type { HasColor, HasFontSize } from "@/shared/types/props";
import type { TypographyStyledProps } from "@/shared/components/typography/style";

import { Typography } from "../typography";
import type { BaseIconButtonProps } from "../icon-button";

import { ButtonStyled, LinkStyled, type ButtonStyledProps } from "./style";

const INHERIT = "inherit";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
    & ButtonStyledProps
    & Partial<HasColor>
    & Partial<HasFontSize>
    & Partial<Pick<TypographyStyledProps, "font">>
    & Partial<Pick<BaseIconButtonProps, "icon">>;

export const Button = ({
    children,
    color = INHERIT,
    font = INHERIT,
    fontSize = "small",
    icon: Icon,
    type = "button",
    ...rest
}: ButtonProps) => (
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

export const LinkButton = (
    { to, ...rest }: ButtonProps & { to: string },
) => (
    <LinkStyled to={to}>
        <Button {...rest} />
    </LinkStyled>
);
