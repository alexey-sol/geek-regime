import React, { type FC, type PropsWithChildren } from "react";
import { type FontSize, Typography, type TypographyProps } from "@eggziom/geek-regime-js-ui-kit";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { mixins } from "@/app/style/mixins";
import { useTypography } from "@/shared/utils/hooks/use-typography";
import { getErrorMessage } from "@/shared/utils/api";
import { type ApiError } from "@/shared/models/dtos";

const DEFAULT_MAX_LINE_COUNT = 1;

type TwoLineTextStyledProps = TypographyProps & {
    maxLineCount?: number;
    lineHeight?: string;
};

const LineCountTextStyled = styled(Typography)<TwoLineTextStyledProps>`
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
        <LineCountTextStyled
            as={as}
            maxLineCount={maxLineCount}
            lineHeight={lineHeight}
            title={title}
        >
            {children}
        </LineCountTextStyled>
    );
};

type OverviewExcerptProps = PropsWithChildren<Pick<TypographyProps, "fontSize">>
    & Pick<TwoLineTextStyledProps, "maxLineCount">;

export const OverviewExcerpt: FC<OverviewExcerptProps> = ({
    children,
    fontSize = "md",
    maxLineCount,
}) => {
    const { lineHeight } = useTypography({ fontSize });

    return (
        <LineCountTextStyled
            fontSize={fontSize}
            lineHeight={lineHeight}
            maxLineCount={maxLineCount}
        >
            {children}
        </LineCountTextStyled>
    );
};

export const FieldErrorMessage: FC<TypographyProps> = (props) => (
    <Typography color="orange" fontSize="xs" {...props} />
);

const ErrorMessageStyled = styled(Typography)`
    padding: 1rem 0;
    text-align: center;
`;

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => (
    <ErrorMessageStyled weight="bold">{children}</ErrorMessageStyled>
);

type ApiErrorMessageProps = {
    error: ApiError;
};

export const ApiErrorMessage: FC<ApiErrorMessageProps> = ({ error }) => {
    const { t } = useTranslation();
    const prefix = t("shared.query.error.message.prefix");
    const message = `${prefix} ${getErrorMessage(error)}`;

    return (
        <ErrorMessage>{message}</ErrorMessage>
    );
};
