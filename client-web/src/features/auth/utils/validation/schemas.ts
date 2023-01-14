import * as yup from "yup";
import { t } from "i18next";

export const getSignInSchema = () => yup.object({
    email: yup.string()
        .required(t("signIn.validation.errors.emailEmpty"))
        .email(t("signIn.validation.errors.emailInvalid")),
    password: yup.string()
        .required(t("signIn.validation.errors.passwordEmpty")),
});
