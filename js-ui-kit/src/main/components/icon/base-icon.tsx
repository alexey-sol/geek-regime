import React, { type FC, PropsWithChildren, type SVGAttributes } from "react";
import { useTheme } from "styled-components";

import type { HasColor, HasFontSize } from "@/types/props";

import { BaseIconStyled } from "./style";

export type IconProps = Partial<HasColor> & Partial<HasFontSize>;

export type BaseIconProps = PropsWithChildren<SVGAttributes<SVGSVGElement> & IconProps>;

export const BaseIcon: FC<BaseIconProps> = ({
    children,
    color,
    fontSize = "normal",
    ...rest
}) => {
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
