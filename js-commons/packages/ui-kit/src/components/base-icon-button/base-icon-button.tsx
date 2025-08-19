import React, { type ButtonHTMLAttributes, type ComponentType, type FC } from "react";

import { IconButtonStyled } from "./style";

import { type IconProps } from "@/components/icon";
import { type FontSizeOrSizeProp } from "@/types/props";

export type BaseIconButtonStyledProps = {
    view?: "primary" | "white";
};

export type BaseIconButtonProps = IconProps &
    BaseIconButtonStyledProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        icon: ComponentType<IconProps>;
    };

export const BaseIconButton: FC<BaseIconButtonProps> = ({ color, fontSize, icon: Icon, size, ...rest }) => {
    const fontSizeOrSize: FontSizeOrSizeProp = {};

    if (fontSize) {
        fontSizeOrSize.fontSize = fontSize;
    } else if (size) {
        fontSizeOrSize.size = size;
    }

    return (
        <IconButtonStyled role="button" {...rest}>
            <Icon color={color} {...fontSizeOrSize} />
        </IconButtonStyled>
    );
};
