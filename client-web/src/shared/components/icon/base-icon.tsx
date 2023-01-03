import React from "react";
import { useTheme } from "styled-components";

import type { HasChildren, HasColor, HasSize } from "@/shared/types/props";

import { BaseIconStyled } from "./style";

export type IconProps = Partial<HasColor> & Partial<HasSize>;

export type BaseIconProps = IconProps & HasChildren & {
    viewBox: string;
};

export const BaseIcon = ({
    children,
    color,
    size = "normal",
    viewBox,
}: BaseIconProps) => {
    const theme = useTheme();
    const cssSizeValue = theme.sizes[size];

    return (
        <BaseIconStyled
            color={color}
            height={cssSizeValue}
            viewBox={viewBox}
            width={cssSizeValue}
        >
            {children}
        </BaseIconStyled>
    );
};