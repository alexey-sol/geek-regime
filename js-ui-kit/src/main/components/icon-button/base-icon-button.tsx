import React, {
    type ButtonHTMLAttributes,
    type ComponentType,
    type FC,
} from "react";

import { type IconProps } from "@/components/icon";

import { IconButtonStyled } from "./style";

export type BaseIconButtonStyledProps = {
    view?: "primary" | "white";
};

export type BaseIconButtonProps = IconProps
    & BaseIconButtonStyledProps
    & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">
    & {
        disabled?: boolean;
        icon: ComponentType<IconProps>;
        onClick: () => void;
        title?: string;
    };

export const BaseIconButton: FC<BaseIconButtonProps> = ({
    color,
    fontSize,
    icon: Icon,
    ...rest
}) => (
    <IconButtonStyled role="button" {...rest}>
        <Icon color={color} fontSize={fontSize} />
    </IconButtonStyled>
);
