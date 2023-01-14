import React from "react";

import type { FontSize } from "@/shared/types/theme";
import { useTypography } from "@/shared/utils/hooks/use-typography";

import { TwoLineTextStyled } from "./style";

export type OverviewCaptionProps = {
    title: string;
};

export const OverviewTitle = ({ title }: OverviewCaptionProps) => {
    const fontSize: FontSize = "large";
    const { lineHeight } = useTypography({ fontSize });

    return (
        <TwoLineTextStyled
            fontSize={fontSize}
            lineHeight={lineHeight}
            title={title}
            view="caption"
        >
            {title}
        </TwoLineTextStyled>
    );
};
