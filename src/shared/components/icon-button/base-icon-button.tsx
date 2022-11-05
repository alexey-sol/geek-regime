import React, { ComponentType } from "react";
import { IconProps } from "@/shared/components/icon";
import { IconButtonStyled } from "./style";

export type BaseIconButtonProps = IconProps & {
    icon: ComponentType<IconProps>;
    onClick: () => void;
    title?: string;
};

export const BaseIconButton = ({
    icon: Icon,
    onClick,
    title,
    ...rest
}: BaseIconButtonProps) => (
    <IconButtonStyled
        onClick={onClick}
        role="button"
        title={title}
    >
        <Icon {...rest} />
    </IconButtonStyled>
);
