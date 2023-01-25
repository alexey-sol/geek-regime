import React, { useCallback, useMemo } from "react";
import type { FormEvent, FormEventHandler } from "react";
import type { FormikProps } from "formik";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { fromSignUpValuesToDto } from "@/features/auth/utils/converters";
import type { SignUpDto } from "@/features/users/models/dtos";

export type SignUpValues = Pick<SignUpDto, "email" | "password">
    & Pick<SignUpDto["details"], "name">
    & { confirmPassword: string };

export type SignUpFormData = {
    handleChangeWrap: (event: FormEvent, cb: FormEventHandler) => void;
    handleSubmit: () => void;
    isPending: boolean;
};

export const useSignUpFormData = (
    { formRef }: { formRef: React.RefObject<FormikProps<SignUpValues>> },
): SignUpFormData => {
    const { isPending, signUp } = useAuthContext();

    const handleSubmit = useCallback(() => {
        const { isValid, values } = formRef.current ?? {};
        const hasValues = values && Object.values(values).every(Boolean);

        if (hasValues && isValid) {
            signUp(fromSignUpValuesToDto(values));
        }
    }, [formRef, signUp]);

    const handleChangeWrap: SignUpFormData["handleChangeWrap"] = useCallback((event, cb) => {
        // TODO show notification on error
        cb(event);
    }, []);

    return useMemo(() => ({
        handleChangeWrap,
        handleSubmit,
        isPending,
    }), [handleChangeWrap, handleSubmit, isPending]);
};
