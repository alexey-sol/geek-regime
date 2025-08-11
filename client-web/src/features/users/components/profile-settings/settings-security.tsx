import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { useTranslation } from "react-i18next";

import { FitContentWrapStyled, SectionStyled } from "./styles";

import { FormInput } from "@/shared/components/form/form-input";
import { type UserMeta } from "@/features/users/models/entities";

export const SettingsSecurity: FC<Pick<UserMeta, "hasCredentials">> = ({
    hasCredentials = false,
}) => {
    const { t } = useTranslation();

    const getInputLabel = (fieldName: string) =>
        t(`users.profile.settings.security.${fieldName}.title`);

    return (
        <SectionStyled>
            <Typography as="h1" fontSize="lg">
                {t("users.profile.settings.security.title")}
            </Typography>

            <FitContentWrapStyled>
                {hasCredentials && (
                    <FormInput
                        label={getInputLabel("oldPassword")}
                        name="credentials.oldPassword"
                        type="password"
                    />
                )}

                <FormInput
                    label={getInputLabel("newPassword")}
                    name="credentials.newPassword"
                    type="password"
                />

                <FormInput
                    label={getInputLabel("confirmPassword")}
                    name="credentials.confirmPassword"
                    type="password"
                />
            </FitContentWrapStyled>
        </SectionStyled>
    );
};
