import React, { useCallback, useMemo } from "react";
import type { FormEvent, FormEventHandler } from "react";
import type { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { toCreateUserRequest } from "@/features/auth/utils/converters";
import { type CreateUserRequest } from "@/features/users/models/dtos";
import { type AuthFormProps } from "@/features/auth/types";
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { useAppDispatch } from "@/app/store/hooks";

export type SignUpValues = Pick<CreateUserRequest, "email" | "password">
    & Pick<CreateUserRequest["details"], "name">
    & { confirmPassword: string };

type UseSignUpFormArg = Pick<AuthFormProps, "onSubmit"> & {
    formRef: React.RefObject<FormikProps<SignUpValues>>;
};

export type SignUpFormData = {
    handleChangeWrap: (event: FormEvent, cb: FormEventHandler) => void;
    handleSubmit: () => void;
    isPending: boolean;
};

export const useSignUpFormData = ({ formRef, onSubmit }: UseSignUpFormArg): SignUpFormData => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { pending, signUp } = useAuthContext();

    const handleSubmit = useCallback(async () => {
        const { isValid, values } = formRef.current ?? {};
        const hasValues = values && Object.values(values).every(Boolean);

        if (hasValues && isValid) {
            signUp(toCreateUserRequest(values)).unwrap()
                .then(() => {
                    onSubmit?.();
                    dispatch(notify(createSuccessSnackbarArg(t("auth.signUp.query.success"))));
                })
                .catch(console.error);
        }
    }, [dispatch, formRef, onSubmit, signUp, t]);

    // TODO need this wrap at all?
    const handleChangeWrap: SignUpFormData["handleChangeWrap"] = useCallback((event, cb) => {
        cb(event);
    }, []);

    return useMemo(() => ({
        handleChangeWrap,
        handleSubmit,
        isPending: Boolean(pending),
    }), [handleChangeWrap, handleSubmit, pending]);
};
