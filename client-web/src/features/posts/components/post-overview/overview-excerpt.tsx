import React from "react";

import { Size } from "@/shared/types/theme";
import { useTypography } from "@/shared/utils/hooks/use-typography";

import { TwoLineTextStyled } from "./style";

export type OverviewExcerptProps = {
    excerpt: string;
};

export const OverviewExcerpt = ({ excerpt }: OverviewExcerptProps) => {
    const size: Size = "normal";
    const { lineHeight } = useTypography({ size });

    return (
        <TwoLineTextStyled
            lineHeight={lineHeight}
            size={size}
        >
            {excerpt}
        </TwoLineTextStyled>
    );
};
