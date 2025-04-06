import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { FormInput } from "@/shared/components/form/form-input";

import { FitContentWrapStyled, SectionStyled } from "./styles";

export const SettingsSecurity: FC = () => {
    const { t } = useTranslation();

    return (
        <SectionStyled>
            <Typography as="h1" fontSize="lg">
                {t("users.profile.settings.security.title")}
            </Typography>

            <FitContentWrapStyled>
                <FormInput
                    label={t("users.profile.settings.security.oldPassword.title")}
                    name="oldPassword"
                    type="password"
                />

                <FormInput
                    label={t("users.profile.settings.security.newPassword.title")}
                    name="newPassword"
                    type="password"
                />
            </FitContentWrapStyled>
        </SectionStyled>
    );
};
