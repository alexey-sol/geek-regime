import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { type ApiError } from "@/shared/models/dtos";
import { getErrorMessage } from "@/shared/utils/api";

const TypographyStyled = styled(Typography)`
    padding: 1rem 0;
    text-align: center;
`;

type ErrorMessageProps = {
    error: ApiError;
};

export const ApiErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
    const { t } = useTranslation();
    const prefix = t("shared.query.error.message.prefix");
    const message = `${prefix} ${getErrorMessage(error)}`;

    return (
        <TypographyStyled weight="bold">{message}</TypographyStyled>
    );
};
