import React, { type FC } from "react";
import type { FontSize } from "@eggziom/geek-regime-js-ui-kit";

import { useTypography } from "@/shared/utils/hooks/use-typography";

import { TwoLineTextStyled } from "./style";

export type OverviewCaptionProps = {
    title: string;
};

export const OverviewTitle: FC<OverviewCaptionProps> = ({ title }) => {
    const fontSize: FontSize = "lg";
    const { lineHeight } = useTypography({ fontSize });

    return (
        <TwoLineTextStyled
            as="h2"
            lineHeight={lineHeight}
            title={title}
        >
            {title}
        </TwoLineTextStyled>
    );
};
