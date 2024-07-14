import React, { useCallback, useMemo } from "react";
import type { FormEvent, FormEventHandler } from "react";
import type { FormikProps } from "formik";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { authBaseUrl } from "@/features/auth/services/api/utils";
import type { AuthenticateRequest } from "@/features/users/models/dtos";

export type SignInFormData = {
    handleChangeWrap: (event: FormEvent, cb: FormEventHandler) => void;
    handleSubmit: () => void;
    isPending: boolean;
    yandexAuthUrl: string;
};

export const useSignInFormData = (
    { formRef }: { formRef: React.RefObject<FormikProps<AuthenticateRequest>> },
): SignInFormData => {
    const { pending, signIn } = useAuthContext();

    const handleSubmit = useCallback(() => {
        const { isValid, values } = formRef.current ?? {};
        const hasValues = values && Object.values(values).every(Boolean);

        if (hasValues && isValid) {
            signIn(values);
        }
    }, [formRef, signIn]);

    const handleChangeWrap: SignInFormData["handleChangeWrap"] = useCallback((event, cb) => {
        // TODO show notification on error
        cb(event);
    }, []);

    const yandexAuthUrl = `${authBaseUrl}/yandex`;

    return useMemo(() => ({
        handleChangeWrap,
        handleSubmit,
        isPending: Boolean(pending),
        yandexAuthUrl,
    }), [handleChangeWrap, handleSubmit, pending, yandexAuthUrl]);
};
