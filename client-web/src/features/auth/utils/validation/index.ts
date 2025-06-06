import * as yup from "yup";
import { t } from "i18next";

export const getSaveEmailSchema = (): yup.StringSchema => yup.string()
    .trim()
    .required(t("auth.errors.validation.emailEmpty"))
    .email(t("auth.errors.validation.emailInvalid"))
    .max(256, t("auth.errors.validation.emailTooLong"));

export const getSaveNameSchema = (): yup.StringSchema => yup.string()
    .trim()
    .required(t("auth.errors.validation.nameEmpty"))
    .min(3, t("auth.errors.validation.nameTooShort"))
    .max(256, t("auth.errors.validation.nameTooLong"));
