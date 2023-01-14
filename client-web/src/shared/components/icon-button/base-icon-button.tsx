import React, { ComponentType } from "react";

import type { IconProps } from "@/shared/components/icon";

import { IconButtonStyled } from "./style";

export type BaseIconButtonStyledProps = {
    view?: "primary" | "white";
};

export type BaseIconButtonProps = IconProps & BaseIconButtonStyledProps & {
    icon: ComponentType<IconProps>;
    onClick: () => void;
    title?: string;
};

export const BaseIconButton = ({
    color,
    fontSize,
    icon: Icon,
    ...rest
}: BaseIconButtonProps) => (
    <IconButtonStyled role="button" {...rest}>
        <Icon color={color} fontSize={fontSize} />
    </IconButtonStyled>
);
