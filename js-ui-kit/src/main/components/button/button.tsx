import React, { type FC } from "react";

import { type BaseButtonProps } from "@/components/button/base-button";

import { Typography } from "../typography";
import type { BaseIconButtonProps } from "../icon-button";

import { ButtonStyled, type ButtonStyledProps } from "./style";

const INHERIT = "inherit";

export type ButtonProps = BaseButtonProps
    & ButtonStyledProps
    & Partial<Pick<BaseIconButtonProps, "icon">>;

export const Button: FC<ButtonProps> = ({
    children,
    color = INHERIT,
    fontSize = "small",
    font = INHERIT,
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
