import React, { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, type FormikProps } from "formik";

import { FormInput } from "@/shared/components/form/form-input";
import { getSignUpSchema } from "@/features/auth/utils/validation/schemas";
import { type MemoizedAuthForm } from "@/features/auth/types";

import { ButtonStyled, FormStyled, SignUpFormStyled } from "./style";
import { useSignUpForm, type SignUpValues } from "./utils";

const initialValues: SignUpValues = {
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
};

export const SignUpForm: MemoizedAuthForm = memo(({ onSubmit }) => {
    const formRef = useRef<FormikProps<SignUpValues>>(null);
    const { t } = useTranslation();

    const {
        handleSubmit,
        isPending,
    } = useSignUpForm({ onSubmit });

    return (
        <SignUpFormStyled>
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange
                validationSchema={getSignUpSchema()}
            >
                {() => (
                    <FormStyled>
                        <section>
                            <FormInput
                                label={t("auth.signUp.fields.email")}
                                name="email"
                                type="text"
                            />

                            <FormInput
                                label={t("auth.signUp.fields.password")}
                                name="password"
                                type="password"
                            />

                            <FormInput
                                label={t("auth.signUp.fields.confirmPassword")}
                                name="confirmPassword"
                                type="password"
                            />

                            <FormInput
                                label={t("auth.signUp.fields.name")}
                                name="name"
                                type="text"
                            />
                        </section>

                        <ButtonStyled
                            disabled={isPending}
                            isStretched
                            type="submit"
                        >
                            {t("auth.signUp.actionButton.title")}
                        </ButtonStyled>
                    </FormStyled>
                )}
            </Formik>
        </SignUpFormStyled>
    );
});
