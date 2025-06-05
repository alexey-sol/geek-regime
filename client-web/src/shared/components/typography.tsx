import React, { type FC, type PropsWithChildren } from "react";
import { type FontSize, Typography, type TypographyProps } from "@eggziom/geek-regime-js-ui-kit";
import styled from "styled-components";

import { mixins } from "@/app/style/mixins";
import { useTypography } from "@/shared/utils/hooks/use-typography";

const DEFAULT_MAX_LINE_COUNT = 1;

type TwoLineTextStyledProps = TypographyProps & {
    maxLineCount?: number;
    lineHeight?: string;
};

const TwoLineTextStyled = styled(Typography)<TwoLineTextStyledProps>`
    ${({
        maxLineCount = DEFAULT_MAX_LINE_COUNT,
        lineHeight,
    }) => lineHeight && mixins.getLineClampText(maxLineCount, lineHeight)};
`;

type OverviewTitleProps = PropsWithChildren<Pick<TypographyProps, "as" | "title">>
    & Pick<TwoLineTextStyledProps, "maxLineCount">;

export const OverviewTitle: FC<OverviewTitleProps> = ({
    as = "h2",
    children,
    maxLineCount,
    title,
}) => {
    const fontSize: FontSize = "lg";
    const { lineHeight } = useTypography({ fontSize });

    return (
        <TwoLineTextStyled
            as={as}
            maxLineCount={maxLineCount}
            lineHeight={lineHeight}
            title={title}
        >
            {children}
        </TwoLineTextStyled>
    );
};

export const OverviewExcerpt: FC<PropsWithChildren<Pick<TypographyProps, "fontSize">>> = ({
    children,
    fontSize = "md",
}) => {
    const { lineHeight } = useTypography({ fontSize });

    return (
        <TwoLineTextStyled fontSize={fontSize} lineHeight={lineHeight}>
            {children}
        </TwoLineTextStyled>
    );
};

export const FieldErrorMessage: FC<TypographyProps> = (props) => (
    <Typography color="orange" fontSize="xs" {...props} />
);
