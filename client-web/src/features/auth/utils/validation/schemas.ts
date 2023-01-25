import * as yup from "yup";
import { t } from "i18next";

import * as cn from "@/features/auth/components/sign-up-form/const";

export const getSignInSchema = () => yup.object({
    email: yup.string()
        .required(t("validation.errors.emailEmpty"))
        .email(t("validation.errors.emailInvalid")),
    password: yup.string()
        .required(t("validation.errors.passwordEmpty")),
});

export const getSignUpSchema = () => yup.object({
    confirmPassword: yup.string()
        .oneOf([yup.ref(cn.PASSWORD_NAME)], t("validation.errors.passwordsNotMatch"))
        .required(t("validation.errors.confirmPasswordEmpty")),
    email: yup.string()
        .required(t("validation.errors.emailEmpty"))
        .email(t("validation.errors.emailInvalid")),
    name: yup.string()
        .required(t("validation.errors.nameEmpty"))
        .min(3, t("validation.errors.nameTooShort"))
        .max(30, t("validation.errors.nameTooLong")),
    password: yup.string()
        .required(t("validation.errors.passwordEmpty")),
});
