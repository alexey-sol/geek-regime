import React, { FormEvent, FormEventHandler, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, type FormikProps } from "formik";

import { BaseDialog } from "@/shared/components/base-dialog";
import { YandexConsentScreen } from "@/features/auth/utils/oauth-consent-screen";
import { Button } from "@/shared/components/button";
import { FormInput } from "@/shared/components/form/form-input";
import { Typography } from "@/shared/components/typography";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { getSignInSchema } from "@/features/auth/utils/validation/schemas";
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
    const { isPending, signIn } = useAuthContext();

    const openWindowToSignInViaYandex = () => {
        const consentScreen = new YandexConsentScreen();
        consentScreen.openWindow();
    };

    const handleChangeWrapper = (event: FormEvent, cb: FormEventHandler) => {
        // TODO show notification on error
        cb(event);
    };

    const handleAction = () => {
        const values = formRef.current?.values;

        if (values) {
            signIn(values);
        }
    };

    return (
        <BaseDialog
            onAction={handleAction}
            onClose={onClose}
            title={t("signIn.wrap.title")}
        >
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                onSubmit={signIn}
                validateOnChange
                validationSchema={getSignInSchema()}
            >
                {({ errors, handleChange }) => (
                    <Form>
                        <FormInput
                            label={t("signIn.local.fields.email")}
                            name={cn.EMAIL_NAME}
                            onChange={(event) => handleChangeWrapper(event, handleChange)}
                            type="text"
                        />

                        <FormInput
                            label={t("signIn.local.fields.password")}
                            name={cn.PASSWORD_NAME}
                            onChange={(event) => handleChangeWrapper(event, handleChange)}
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
