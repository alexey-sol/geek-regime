import React, { ReactNode } from "react";
import { useTheme } from "styled-components";
import { HasColor, HasSize } from "@/shared/types/theme";
import { BaseIconStyled } from "./style";

export type IconProps = Partial<HasColor> & Partial<HasSize>;

export type BaseIconProps = IconProps & {
    children: ReactNode;
    viewBox: string;
};

export const BaseIcon = ({
    children,
    color,
    size = "normal",
    viewBox,
}: BaseIconProps) => {
    const theme = useTheme();
    const cssSize = theme.sizes[size];

    return (
        <BaseIconStyled
            color={color}
            height={cssSize}
            viewBox={viewBox}
            width={cssSize}
        >
            {children}
        </BaseIconStyled>
    );
};
