import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

export const ConfirmationDoneView: FC = () => {
    const { t } = useTranslation();

    return (
        <section>
            <Typography>
                {t("auth.confirmation.done.view.text")}
            </Typography>
        </section>
    );
};
