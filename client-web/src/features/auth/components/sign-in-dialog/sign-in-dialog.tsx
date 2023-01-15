import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, type FormikProps } from "formik";

import { BaseDialog } from "@/shared/components/base-dialog";
import { Button } from "@/shared/components/button";
import { FormInput } from "@/shared/components/form/form-input";
import { Typography } from "@/shared/components/typography";
import { getSignInSchema } from "@/features/auth/utils/validation/schemas";
import { useSignInDialogData } from "@/features/auth/components/sign-in-dialog/utils";
import type { SignInArg } from "@/features/auth/services/api/types";

import * as cn from "./const";

const initialValues: SignInArg = {
    email: "",
    password: "",
};

export type SignInDialogProps = {
    onClose: () => void;
};

export const SignInDialog = ({ onClose }: SignInDialogProps) => {
    const formRef = useRef<FormikProps<SignInArg>>(null);
    const { t } = useTranslation();

    const {
        handleAction,
        handleChangeWrap,
        isPending,
        openWindowToSignInViaYandex,
    } = useSignInDialogData({ formRef });

    return (
        <BaseDialog
            onAction={handleAction}
            onClose={onClose}
            title={t("signIn.wrap.title")}
        >
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                onSubmit={handleAction}
                validateOnChange
                validationSchema={getSignInSchema()}
            >
                {({ errors, handleChange }) => (
                    <Form>
                        <FormInput
                            label={t("signIn.local.fields.email")}
                            name={cn.EMAIL_NAME}
                            onChange={(event) => handleChangeWrap(event, handleChange)}
                            type="text"
                        />

                        <FormInput
                            label={t("signIn.local.fields.password")}
                            name={cn.PASSWORD_NAME}
                            onChange={(event) => handleChangeWrap(event, handleChange)}
                            type="password"
                        />

                        <Button
                            disabled={isPending || Object.keys(errors).length > 0}
                            type="submit"
                        >
                            {t("signIn.local.actionButton.title")}
                        </Button>
                    </Form>
                )}
            </Formik>

            <Typography>
                А еще можно войти с помощью таких сервисов:
            </Typography>

            <Button onClick={openWindowToSignInViaYandex} view="secondary">
                {t("signIn.oauth.providers.yandex.name")}
            </Button>
        </BaseDialog>
    );
};
