import React, { memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, type FormikProps } from "formik";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { FormInput } from "@/shared/components/form/form-input";
import { getSignInSchema } from "@/features/auth/utils/validation/schemas";
import type { MemoizedAuthForm } from "@/features/auth/types";
import type { AuthenticateRequest } from "@/features/users/models/dtos";

import { ButtonStyled, LinkButtonStyled, SignInFormStyled } from "./style";
import { useSignInFormData } from "./utils";
import * as cn from "./const";

const initialValues: AuthenticateRequest = {
    email: "",
    password: "",
};

export const SignInForm: MemoizedAuthForm = memo(({ goTo }) => {
    const formRef = useRef<FormikProps<AuthenticateRequest>>(null);
    const { t } = useTranslation();

    const {
        handleChangeWrap,
        handleSubmit,
        isPending,
        yandexAuthUrl,
    } = useSignInFormData({ formRef });

    const goToSignUp = useCallback(() => {
        if (goTo) {
            goTo("sign-up");
        }
    }, [goTo]);

    return (
        <SignInFormStyled>
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange
                validationSchema={getSignInSchema()}
            >
                {({ errors, handleChange }) => (
                    <Form>
                        <section>
                            <FormInput
                                label={t("auth.signIn.local.fields.email")}
                                name={cn.EMAIL_NAME}
                                onChange={(event) => handleChangeWrap(event, handleChange)}
                                type="text"
                            />

                            <FormInput
                                label={t("auth.signIn.local.fields.password")}
                                name={cn.PASSWORD_NAME}
                                onChange={(event) => handleChangeWrap(event, handleChange)}
                                type="password"
                            />
                        </section>

                        <ButtonStyled
                            disabled={isPending || Object.keys(errors).length > 0}
                            isStretched
                            type="submit"
                        >
                            {t("auth.signIn.local.actionButton.title")}
                        </ButtonStyled>
                    </Form>
                )}
            </Formik>

            <section>
                <Typography>
                    {t("auth.signIn.signUp.suggestion.preface")}

                    <LinkButtonStyled onClick={goToSignUp}>
                        {t("auth.signIn.signUp.suggestion.link")}
                    </LinkButtonStyled>
                </Typography>
            </section>

            <section>
                <Typography>
                    {t("auth.signIn.oauth.suggestion.preface")}
                </Typography>

                <a href={yandexAuthUrl}>
                    <ButtonStyled isStretched view="secondary">
                        {t("auth.signIn.oauth.providers.yandex.name")}
                    </ButtonStyled>
                </a>
            </section>
        </SignInFormStyled>
    );
});
