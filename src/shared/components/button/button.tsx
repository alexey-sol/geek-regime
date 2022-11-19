import React, { ButtonHTMLAttributes } from "react";

import { Typography } from "@/shared/components/typography";
import { TypographyStyledProps } from "@/shared/components/typography/types";
import { BaseIconButtonProps } from "@/shared/components/icon-button";
import { HasColor, HasSize } from "@/shared/types/theme";

import { ButtonStyledProps } from "./types";
import { ButtonStyled, LinkStyled } from "./style";

const inherit = "inherit";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
    & ButtonStyledProps
    & Partial<HasColor>
    & Partial<HasSize>
    & Partial<Pick<TypographyStyledProps, "font">>
    & Partial<Pick<BaseIconButtonProps, "icon">>;

export const Button = ({
    children,
    color = inherit,
    font = inherit,
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
