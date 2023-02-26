import * as yup from "yup";
import { t } from "i18next";

import * as cn from "@/features/auth/components/sign-up-form/const";

type Schema = ReturnType<typeof yup.object>;

export const getSignInSchema = (): Schema => yup.object({
    email: yup.string()
        .required(t("auth.errors.validation.emailEmpty"))
        .email(t("auth.errors.validation.emailInvalid")),
    password: yup.string()
        .required(t("auth.errors.validation.passwordEmpty")),
});

export const getSignUpSchema = (): Schema => yup.object({
    confirmPassword: yup.string()
        .oneOf([yup.ref(cn.PASSWORD_NAME)], t("auth.errors.validation.passwordsNotMatch"))
        .required(t("auth.errors.validation.confirmPasswordEmpty")),
    email: yup.string()
        .required(t("auth.errors.validation.emailEmpty"))
        .email(t("auth.errors.validation.emailInvalid")),
    name: yup.string()
        .required(t("auth.errors.validation.nameEmpty"))
        .min(3, t("auth.errors.validation.nameTooShort"))
        .max(30, t("auth.errors.validation.nameTooLong")),
    password: yup.string()
        .required(t("auth.errors.validation.passwordEmpty")),
});
