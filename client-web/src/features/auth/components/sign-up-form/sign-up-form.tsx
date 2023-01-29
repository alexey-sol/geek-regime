import React, { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Formik, type FormikProps } from "formik";

import { FormInput } from "@/shared/components/form/form-input";
import { getSignUpSchema } from "@/features/auth/utils/validation/schemas";
import type { MemoizedAuthForm } from "@/features/auth/types";

import { ButtonStyled, SignUpFormStyled } from "./style";
import { useSignUpFormData, type SignUpValues } from "./utils";
import * as cn from "./const";

const initialValues: SignUpValues = {
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
};

export const SignUpForm: MemoizedAuthForm = memo(() => {
    const formRef = useRef<FormikProps<SignUpValues>>(null);
    const { t } = useTranslation();

    const {
        handleChangeWrap,
        handleSubmit,
        isPending,
    } = useSignUpFormData({ formRef });

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
                    <Form>
                        <FormInput
                            label={t("signUp.fields.email")}
                            name={cn.EMAIL_NAME}
                            onChange={(event) => handleChangeWrap(event, handleChange)}
                            type="text"
                        />

                        <FormInput
                            label={t("signUp.fields.password")}
                            name={cn.PASSWORD_NAME}
                            onChange={(event) => handleChangeWrap(event, handleChange)}
                            type="password"
                        />

                        <FormInput
                            label={t("signUp.fields.confirmPassword")}
                            name={cn.CONFIRM_PASSWORD_NAME}
                            onChange={(event) => handleChangeWrap(event, handleChange)}
                            type="password"
                        />

                        <FormInput
                            label={t("signUp.fields.name")}
                            name={cn.USERNAME_NAME}
                            onChange={(event) => handleChangeWrap(event, handleChange)}
                            type="text"
                        />

                        <ButtonStyled
                            disabled={isPending || Object.keys(errors).length > 0}
                            isStretched
                            type="submit"
                        >
                            {t("signUp.actionButton.title")}
                        </ButtonStyled>
                    </Form>
                )}
            </Formik>
        </SignUpFormStyled>
    );
});
