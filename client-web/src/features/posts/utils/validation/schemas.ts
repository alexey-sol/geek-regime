import * as yup from "yup";
import { t } from "i18next";

type Schema = ReturnType<typeof yup.object>;

export const getPostSchema = (): Schema => yup.object({
    body: yup.string()
        .trim()
        .required(t("posts.errors.validation.bodyEmpty"))
        .max(5000, t("posts.errors.validation.bodyTooLong")),
    spaces: yup.array()
        .of(yup.object().shape({
            title: yup.string()
                .trim()
                .max(256, t("posts.errors.validation.titleTooLong")),
        })),
    title: yup.string()
        .trim()
        .required(t("posts.errors.validation.titleEmpty"))
        .max(256, t("posts.errors.validation.titleTooLong")),
});

export const getPostCommentSchema = (): Schema => yup.object({
    bodyText: yup.string()
        .trim()
        .required(t("posts.errors.validation.bodyEmpty"))
        .max(5000, t("posts.errors.validation.bodyTooLong")),
});
