import React from "react";

import { FontSize } from "@/shared/types/theme";
import { useTypography } from "@/shared/utils/hooks/use-typography";

import { TwoLineTextStyled } from "./style";

export type OverviewExcerptProps = {
    excerpt: string;
};

export const OverviewExcerpt = ({ excerpt }: OverviewExcerptProps) => {
    const fontSize: FontSize = "normal";
    const { lineHeight } = useTypography({ fontSize });

    return (
        <TwoLineTextStyled
            fontSize={fontSize}
            lineHeight={lineHeight}
        >
            {excerpt}
        </TwoLineTextStyled>
    );
};
