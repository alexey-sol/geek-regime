import React from "react";

import type { Size } from "@/shared/types/theme";
import { useTypography } from "@/shared/utils/hooks/use-typography";

import { TwoLineTextStyled } from "./style";

export type OverviewCaptionProps = {
    title: string;
};

export const OverviewTitle = ({ title }: OverviewCaptionProps) => {
    const size: Size = "large";
    const { lineHeight } = useTypography({ size });

    return (
        <TwoLineTextStyled
            lineHeight={lineHeight}
            size={size}
            title={title}
            view="caption"
        >
            {title}
        </TwoLineTextStyled>
    );
};
