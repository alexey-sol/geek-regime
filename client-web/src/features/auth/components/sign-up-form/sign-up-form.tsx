import React, { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Field, Formik, type FormikProps } from "formik";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { FormInput } from "@/shared/components/form/form-input";
import { getSignUpSchema } from "@/features/auth/utils/validation/schemas";
import { type MemoizedAuthForm } from "@/features/auth/types";

import {
    ButtonStyled, CheckboxLabelStyled, FormStyled, SignUpFormStyled,
} from "./style";
import { useSignUpForm, type SignUpValues } from "./utils";

const initialValues: SignUpValues = {
    confirmPassword: "",
    disableEmailConfirmation: false,
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

                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <CheckboxLabelStyled>
                                <Field name="disableEmailConfirmation" type="checkbox" />
                                <Typography fontSize="sm">
                                    {t("auth.signUp.fields.disableEmailConfirmation")}
                                </Typography>
                            </CheckboxLabelStyled>
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
