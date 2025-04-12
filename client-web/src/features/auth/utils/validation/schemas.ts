import * as yup from "yup";
import { t } from "i18next";

import { getSaveEmailSchema, getSaveNameSchema } from ".";

type Schema = ReturnType<typeof yup.object>;

export const getSignInSchema = (): Schema => yup.object({
    email: getSaveEmailSchema(),
    password: yup.string()
        .required(t("auth.errors.validation.passwordEmpty")),
});

export const getSignUpSchema = (): Schema => yup.object({
    confirmPassword: yup.string()
        .oneOf([yup.ref("password")], t("auth.errors.validation.passwordsNotMatch"))
        .required(t("auth.errors.validation.confirmPasswordEmpty")),
    email: getSaveEmailSchema(),
    name: getSaveNameSchema(),
    password: yup.string()
        .required(t("auth.errors.validation.passwordEmpty")),
});
