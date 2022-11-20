import React, { ComponentType } from "react";

import type { IconProps } from "@/shared/components/icon";

import { IconButtonStyled } from "./style";
import type { BaseIconButtonStyledProps } from "./types";

export type BaseIconButtonProps = IconProps & BaseIconButtonStyledProps & {
    icon: ComponentType<IconProps>;
    onClick: () => void;
    title?: string;
};

export const BaseIconButton = ({
    color,
    icon: Icon,
    size,
    ...rest
}: BaseIconButtonProps) => (
    <IconButtonStyled role="button" {...rest}>
        <Icon color={color} size={size} />
    </IconButtonStyled>
);
