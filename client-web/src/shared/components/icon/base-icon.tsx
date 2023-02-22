import React, { type SVGAttributes } from "react";
import { useTheme } from "styled-components";

import type { HasChildren, HasColor, HasFontSize } from "@/shared/types/props";

import { BaseIconStyled } from "./style";

export type IconProps = Partial<HasColor> & Partial<HasFontSize>;

export type BaseIconProps = SVGAttributes<SVGSVGElement> & IconProps & HasChildren;

export const BaseIcon = ({
    children,
    color,
    fontSize = "normal",
    ...rest
}: BaseIconProps) => {
    const theme = useTheme();
    const cssFontSizeValue = theme.fontSizes[fontSize];

    return (
        <BaseIconStyled
            color={color}
            height={cssFontSizeValue}
            width={cssFontSizeValue}
            {...rest}
        >
            {children}
        </BaseIconStyled>
    );
};
