import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { FooterInnerStyled, FooterStyled } from "./style";

export const Footer: FC = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <FooterStyled>
            <FooterInnerStyled>
                <Typography color="white" fontSize="sm">
                    {`${t("shared.footer.content")} ${currentYear}.`}
                </Typography>
            </FooterInnerStyled>
        </FooterStyled>
    );
};
