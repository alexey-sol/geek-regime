import React, { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, type FormikProps } from "formik";

import { FormInput } from "@/shared/components/form/form-input";
import { getSignUpSchema } from "@/features/auth/utils/validation/schemas";
import type { MemoizedAuthForm } from "@/features/auth/types";

import { ButtonStyled, FormStyled, SignUpFormStyled } from "./style";
import { useSignUpFormData, type SignUpValues } from "./utils";
import * as cn from "./const";

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
        handleChangeWrap,
        handleSubmit,
        isPending,
    } = useSignUpFormData({ formRef, onSubmit });

    return (
        <SignUpFormStyled>
            <Formik
                innerRef={formRef}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange
                validationSchema={getSignUpSchema()}
            >
                {({ errors, handleChange }) => (
                    <FormStyled>
                        <section>
                            <FormInput
                                label={t("auth.signUp.fields.email")}
                                name={cn.EMAIL_NAME}
                                onChange={(event) => handleChangeWrap(event, handleChange)}
                                type="text"
                            />

                            <FormInput
                                label={t("auth.signUp.fields.password")}
                                name={cn.PASSWORD_NAME}
                                onChange={(event) => handleChangeWrap(event, handleChange)}
                                type="password"
                            />

                            <FormInput
                                label={t("auth.signUp.fields.confirmPassword")}
                                name={cn.CONFIRM_PASSWORD_NAME}
                                onChange={(event) => handleChangeWrap(event, handleChange)}
                                type="password"
                            />

                            <FormInput
                                label={t("auth.signUp.fields.name")}
                                name={cn.USERNAME_NAME}
                                onChange={(event) => handleChangeWrap(event, handleChange)}
                                type="text"
                            />
                        </section>

                        <ButtonStyled
                            disabled={isPending || Object.keys(errors).length > 0}
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
