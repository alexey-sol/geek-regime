import * as yup from "yup";
import { t } from "i18next";
import StringSchema from "yup/lib/string";

export const getSaveEmailSchema = (): StringSchema => yup.string()
    .trim()
    .required(t("auth.errors.validation.emailEmpty"))
    .email(t("auth.errors.validation.emailInvalid"));

export const getSaveNameSchema = (): StringSchema => yup.string()
    .trim()
    .required(t("auth.errors.validation.nameEmpty"))
    .min(3, t("auth.errors.validation.nameTooShort"))
    .max(30, t("auth.errors.validation.nameTooLong"));
