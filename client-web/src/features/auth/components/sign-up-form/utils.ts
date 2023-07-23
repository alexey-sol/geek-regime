import React, { useCallback, useMemo } from "react";
import type { FormEvent, FormEventHandler } from "react";
import type { FormikProps } from "formik";
import type { CreateUserDto } from "@eggziom/geek-regime-js-commons";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { fromSignUpValuesToDto } from "@/features/auth/utils/converters";

export type SignUpValues = Pick<CreateUserDto, "email" | "password">
    & Pick<CreateUserDto["details"], "name">
    & { confirmPassword: string };

export type SignUpFormData = {
    handleChangeWrap: (event: FormEvent, cb: FormEventHandler) => void;
    handleSubmit: () => void;
    isPending: boolean;
};

export const useSignUpFormData = (
    { formRef }: { formRef: React.RefObject<FormikProps<SignUpValues>> },
): SignUpFormData => {
    const { pending, signUp } = useAuthContext();

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
        isPending: Boolean(pending),
    }), [handleChangeWrap, handleSubmit, pending]);
};
