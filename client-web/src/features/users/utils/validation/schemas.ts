import * as yup from "yup";
import { t } from "i18next";

import { getSaveEmailSchema, getSaveNameSchema } from "@/features/auth/utils/validation";

type Schema = ReturnType<typeof yup.object>;

const isNotEmpty = (value?: string) => !!value?.length;

const getConfirmPasswordSchema = (): yup.StringSchema => yup.string()
    .when("newPassword", {
        is: isNotEmpty,
        then: yup.string().required(t("auth.errors.validation.confirmPasswordEmpty")),
    })
    .oneOf([yup.ref("newPassword")], t("auth.errors.validation.passwordsNotMatch"));

const getCreatePasswordSchema = (): Schema => yup.object({
    newPassword: yup.string(),
    confirmPassword: getConfirmPasswordSchema(),
});

const getUpdatePasswordSchema = (): Schema => yup.object().shape({
    oldPassword: yup.string()
        .when("newPassword", {
            is: isNotEmpty,
            then: yup.string().required(t("users.profile.settings.validation.oldPasswordEmpty")),
        }),
    newPassword: yup.string()
        .when("oldPassword", {
            is: isNotEmpty,
            then: yup.string().required(t("users.profile.settings.validation.newPasswordEmpty")),
        }),
    confirmPassword: getConfirmPasswordSchema(),
}, [["oldPassword", "newPassword"]]);

export const getProfileSettingsSchema = (hasCredentials: boolean): Schema => yup.object({
    credentials: hasCredentials
        ? getUpdatePasswordSchema()
        : getCreatePasswordSchema(),
    email: getSaveEmailSchema(),
    details: yup.object({
        about: yup.string()
            .trim()
            .max(2000, t("users.profile.settings.validation.aboutTooLong")),
        description: yup.string()
            .trim()
            .max(1024, t("users.profile.settings.validation.descriptionTooLong")),
        name: getSaveNameSchema(),
    }),
});
