import React from "react";
import { useTheme } from "styled-components";

import type { HasChildren, HasColor, HasFontSize } from "@/shared/types/props";

import { BaseIconStyled } from "./style";

export type IconProps = Partial<HasColor> & Partial<HasFontSize>;

export type BaseIconProps = IconProps & HasChildren & {
    viewBox: string;
};

export const BaseIcon = ({
    children,
    color,
    fontSize = "normal",
    viewBox,
}: BaseIconProps) => {
    const theme = useTheme();
    const cssFontSizeValue = theme.fontSizes[fontSize];

    return (
        <BaseIconStyled
            color={color}
            height={cssFontSizeValue}
            viewBox={viewBox}
            width={cssFontSizeValue}
        >
            {children}
        </BaseIconStyled>
    );
};
