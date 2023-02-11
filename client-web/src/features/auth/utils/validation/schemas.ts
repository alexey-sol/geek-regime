import * as yup from "yup";
import { t } from "i18next";

import * as cn from "@/features/auth/components/sign-up-form/const";

export const getSignInSchema = () => yup.object({
    email: yup.string()
        .required(t("errors.validation.emailEmpty"))
        .email(t("errors.validation.emailInvalid")),
    password: yup.string()
        .required(t("errors.validation.passwordEmpty")),
});

export const getSignUpSchema = () => yup.object({
    confirmPassword: yup.string()
        .oneOf([yup.ref(cn.PASSWORD_NAME)], t("errors.validation.passwordsNotMatch"))
        .required(t("errors.validation.confirmPasswordEmpty")),
    email: yup.string()
        .required(t("errors.validation.emailEmpty"))
        .email(t("errors.validation.emailInvalid")),
    name: yup.string()
        .required(t("errors.validation.nameEmpty"))
        .min(3, t("errors.validation.nameTooShort"))
        .max(30, t("errors.validation.nameTooLong")),
    password: yup.string()
        .required(t("errors.validation.passwordEmpty")),
});
