import * as yup from "yup";
import { t } from "i18next";

type Schema = ReturnType<typeof yup.object>;

export const getPostCommentSchema = (): Schema => yup.object({
    bodyText: yup.string()
        .required(t("posts.errors.validation.bodyEmpty"))
        .max(5000, t("posts.errors.validation.bodyTooLong")),
});
