import React, { type FC } from "react";
import { useTranslation } from "react-i18next";

import { ErrorMessage } from "@/shared/components/typography";

export const NotFoundView: FC = () => {
    const { t } = useTranslation();

    return (
        <section>
            <ErrorMessage>{t("shared.page.error.notFound.title")}</ErrorMessage>
        </section>
    );
};
