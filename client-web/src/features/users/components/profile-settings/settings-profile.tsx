import React, { type FC } from "react";
import { Tooltip } from "@eggziom/geek-regime-js-ui-kit/components/tooltip";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { useTranslation } from "react-i18next";
import { Field, type FieldProps, useFormikContext } from "formik";
import { sub } from "date-fns";

import { FitContentWrapStyled, GridStyled, SectionStyled } from "./styles";
import { type ProfileSettingsValues } from "./types";

import { FormInput } from "@/shared/components/form/form-input";
import { useUserTranslation } from "@/features/users/utils/hooks/use-user-translation";
import { Select } from "@/shared/components/form/select";
import { getDateWithoutTime } from "@/shared/utils/formatters/date";
import { type UserDetails } from "@/features/users/models/entities";
import { AboutEditor } from "@/features/users/components/profile-settings/about-editor";

const BIRTH_DATE_YEARS_AGO_LIMIT = 150;

type SettingsProfileProps = {
    userDetails: UserDetails;
};

export const SettingsProfile: FC<SettingsProfileProps> = ({ userDetails }) => {
    const { t } = useTranslation();
    const { errors, values } = useFormikContext<ProfileSettingsValues>();
    const { mapGenderToTranslation } = useUserTranslation();
    const aboutErrorMessage = (errors.details as ProfileSettingsValues["details"])?.about;

    const birthDateMin = getDateWithoutTime(sub(new Date(), {
        years: BIRTH_DATE_YEARS_AGO_LIMIT,
    }).toISOString());
    const birthDateMax = getDateWithoutTime(new Date().toISOString());

    const disableGenderTooltip = !values?.details?.gender || values.details.gender === "BLANK";

    return (
        <SectionStyled>
            <Typography as="h1" fontSize="lg">
                {t("users.profile.settings.profile.title")}
            </Typography>

            <FitContentWrapStyled>
                <FormInput
                    label={t("users.profile.settings.profile.email.title")}
                    name="email"
                    type="text"
                />

                <FormInput
                    label={t("users.profile.settings.profile.name.title")}
                    name="details.name"
                    type="text"
                />

                <FormInput
                    label={t("users.profile.settings.profile.description.title")}
                    name="details.description"
                    type="text"
                />
            </FitContentWrapStyled>

            <AboutEditor errorMessage={aboutErrorMessage} initialValue={userDetails.about} />

            <GridStyled>
                <Typography as="h2" fontSize="md">
                    {t("users.profile.settings.profile.gender.title")}
                </Typography>

                <span>
                    <Tooltip
                        disabled={disableGenderTooltip}
                        message={t("users.profile.settings.profile.gender.tooltip")}
                    >
                        <Field name="details.gender">
                            {({ field }: FieldProps) => (
                                <Select {...field}>
                                    {Object.entries(mapGenderToTranslation)
                                        .map(([value, translation]) => (
                                            <option key={value} value={value}>{translation}</option>
                                        ))}
                                </Select>
                            )}
                        </Field>
                    </Tooltip>
                </span>

                <Typography as="h2" fontSize="md">
                    {t("users.profile.settings.profile.birthDate.title")}
                </Typography>

                <FormInput
                    min={birthDateMin}
                    max={birthDateMax}
                    name="details.birthDate"
                    type="date"
                />
            </GridStyled>
        </SectionStyled>
    );
};
