import React, { type FC } from "react";
import type { FontSize } from "@eggziom/geek-regime-js-ui-kit";

import { useTypography } from "@/shared/utils/hooks/use-typography";

import { TwoLineTextStyled } from "./style";

export type OverviewExcerptProps = {
    excerpt: string;
};

export const OverviewExcerpt: FC<OverviewExcerptProps> = ({ excerpt }) => {
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
