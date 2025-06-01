import React, { type FC, type PropsWithChildren } from "react";
import { type FontSize, Typography, type TypographyProps } from "@eggziom/geek-regime-js-ui-kit";
import styled from "styled-components";

import { mixins } from "@/app/style/mixins";
import { useTypography } from "@/shared/utils/hooks/use-typography";

const TWO_LINES = 2;

type TwoLineTextStyledProps = TypographyProps & {
    lineHeight?: string;
};

const TwoLineTextStyled = styled(Typography)<TwoLineTextStyledProps>`
    ${({ lineHeight }) => lineHeight && mixins.getLineClampText(TWO_LINES, lineHeight)};
`;

export const OverviewTitle: FC<PropsWithChildren<Pick<TypographyProps, "as" | "title">>> = ({
    as = "h2",
    children,
    title,
}) => {
    const fontSize: FontSize = "lg";
    const { lineHeight } = useTypography({ fontSize });

    return (
        <TwoLineTextStyled as={as} lineHeight={lineHeight} title={title}>
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
