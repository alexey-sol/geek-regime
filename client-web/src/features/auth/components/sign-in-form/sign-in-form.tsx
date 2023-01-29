import React, { memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, type FormikProps } from "formik";

import { Button } from "@/shared/components/button";
import { FormInput } from "@/shared/components/form/form-input";
import { Typography } from "@/shared/components/typography";
import { getSignInSchema } from "@/features/auth/utils/validation/schemas";
import type { SignInDto } from "@/features/users/models/dtos";
import type { MemoizedAuthForm } from "@/features/auth/types";

import { ButtonStyled, SignInFormStyled, TransparentButtonStyled } from "./style";
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

                        <ButtonStyled
                            disabled={isPending || Object.keys(errors).length > 0}
                            isStretched
                            type="submit"
                        >
                            {t("signIn.local.actionButton.title")}
                        </ButtonStyled>
                    </Form>
                )}
            </Formik>

            <Typography>
                {t("signIn.signUp.suggestion.preface")}

                <TransparentButtonStyled
                    fontSize="normal"
                    view="transparent"
                    onClick={goToSignUp}
                >
                    {t("signIn.signUp.suggestion.link")}
                </TransparentButtonStyled>
            </Typography>

            <Typography>
                {t("signIn.oauth.suggestion.preface")}
            </Typography>

            <Button
                isStretched
                onClick={openWindowToSignInViaYandex}
                view="secondary"
            >
                {t("signIn.oauth.providers.yandex.name")}
            </Button>
        </SignInFormStyled>
    );
});
