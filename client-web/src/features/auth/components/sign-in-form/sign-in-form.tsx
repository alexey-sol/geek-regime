import React, { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, type FormikProps } from "formik";

import { Button } from "@/shared/components/button";
import { FormInput } from "@/shared/components/form/form-input";
import { Typography } from "@/shared/components/typography";
import { getSignInSchema } from "@/features/auth/utils/validation/schemas";
import type { SignInDto } from "@/features/users/models/dtos";
import type { MemoizedAuthForm } from "@/features/auth/types";

import { TransparentButtonStyled } from "./style";
import { useSignInFormData } from "./utils";
import * as cn from "./const";

const initialValues: SignInDto = {
    email: "",
    password: "",
};

export const SignInForm: MemoizedAuthForm = memo(({ goTo }) => {
    const formRef = useRef<FormikProps<SignInDto>>(null);
    const { t } = useTranslation();

    const {
        handleChangeWrap,
        handleSubmit,
        isPending,
        openWindowToSignInViaYandex,
    } = useSignInFormData({ formRef });

    return (
        <section>
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                onSubmit={handleSubmit}
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
                {t("signIn.signUp.suggestion.preface")}

                <TransparentButtonStyled
                    fontSize="normal"
                    view="transparent"
                    onClick={() => goTo("sign-up")}
                >
                    {t("signIn.signUp.suggestion.link")}
                </TransparentButtonStyled>
            </Typography>

            <Typography>
                {t("signIn.oauth.suggestion.preface")}
            </Typography>

            <Button onClick={openWindowToSignInViaYandex} view="secondary">
                {t("signIn.oauth.providers.yandex.name")}
            </Button>
        </section>
    );
});
