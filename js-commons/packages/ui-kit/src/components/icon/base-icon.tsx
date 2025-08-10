import React, { type FC, type PropsWithChildren, type SVGAttributes } from "react";
import { useTheme } from "styled-components";

import { BaseIconStyled } from "./style";

import { type FontSizeOrSizeProp, type HasColor } from "@/types/props";

export type IconProps = Partial<HasColor> & FontSizeOrSizeProp;

export type BaseIconProps = PropsWithChildren<SVGAttributes<SVGSVGElement> & IconProps>;

export const BaseIcon: FC<BaseIconProps> = ({
    children,
    color,
    fontSize = "md",
    size,
    ...rest
}) => {
    const theme = useTheme();
    const cssFontSizeValue = theme.fontSizes[fontSize];
    const resultSize = size ?? cssFontSizeValue;

    return (
        <BaseIconStyled
            color={color}
            height={resultSize}
            width={resultSize}
            {...rest}
        >
            {children}
        </BaseIconStyled>
    );
};
