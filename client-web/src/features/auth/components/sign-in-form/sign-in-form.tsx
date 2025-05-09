import React, { memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, type FormikProps } from "formik";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { FormInput } from "@/shared/components/form/form-input";
import { getSignInSchema } from "@/features/auth/utils/validation/schemas";
import { type MemoizedAuthForm } from "@/features/auth/types";
import { type AuthenticateRequest } from "@/features/users/models/dtos";

import { ButtonStyled, LinkButtonStyled, SignInFormStyled } from "./style";
import { useSignInForm } from "./utils";

const initialValues: AuthenticateRequest = {
    email: "",
    password: "",
};

export const SignInForm: MemoizedAuthForm = memo(({ goTo, onSubmit }) => {
    const formRef = useRef<FormikProps<AuthenticateRequest>>(null);
    const { t } = useTranslation();

    const {
        handleSubmit,
        isPending,
        yandexAuthUrl,
    } = useSignInForm({ onSubmit });

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
                {() => (
                    <Form>
                        <section>
                            <FormInput
                                label={t("auth.signIn.local.fields.email")}
                                name="email"
                                type="text"
                            />

                            <FormInput
                                label={t("auth.signIn.local.fields.password")}
                                name="password"
                                type="password"
                            />
                        </section>

                        <ButtonStyled
                            disabled={isPending}
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
