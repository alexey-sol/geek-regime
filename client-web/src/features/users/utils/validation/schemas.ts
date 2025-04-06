import * as yup from "yup";
import { t } from "i18next";

import { getSaveEmailSchema, getSaveNameSchema } from "@/features/auth/utils/validation";

type Schema = ReturnType<typeof yup.object>;

export const getProfileSettingsSchema = (): Schema => yup.object({
    newPassword: yup.string()
        .oneOf([yup.ref("oldPassword")], t("auth.errors.validation.passwordsNotMatch")),
    email: getSaveEmailSchema(),
    oldPassword: yup.string()
        .oneOf([yup.ref("newPassword")], t("auth.errors.validation.passwordsNotMatch")),
    details: yup.object({
        about: yup.string()
            .max(2000, t("users.profile.settings.validation.aboutTooLong")),
        name: getSaveNameSchema(),
    }),
});
