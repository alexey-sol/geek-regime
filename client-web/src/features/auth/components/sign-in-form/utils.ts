import React, {
    useCallback, useMemo, type FormEvent, type FormEventHandler,
} from "react";
import { type FormikProps } from "formik";
import { resources } from "@eggziom/geek-regime-js-commons";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { API_PREFIX } from "@/shared/const";
import { type AuthFormProps } from "@/features/auth/types";
import { type AuthenticateRequest } from "@/features/users/models/dtos";

export const AUTH_BASE_URL = `${API_PREFIX}/v1/${resources.AUTH}`;

type UseSignInFormArg = Pick<AuthFormProps, "onSubmit"> & {
    formRef: React.RefObject<FormikProps<AuthenticateRequest>>;
};

export type SignInFormData = {
    handleChangeWrap: (event: FormEvent, cb: FormEventHandler) => void;
    handleSubmit: () => void;
    isPending: boolean;
    yandexAuthUrl: string;
};

export const useSignInFormData = ({ formRef, onSubmit }: UseSignInFormArg): SignInFormData => {
    const { pending, signIn } = useAuthContext();

    const handleSubmit = useCallback(async () => {
        const { isValid, values } = formRef.current ?? {};
        const hasValues = values && Object.values(values).every(Boolean);

        if (hasValues && isValid) {
            signIn(values).unwrap()
                .then(onSubmit)
                .catch(console.error);
        }
    }, [formRef, onSubmit, signIn]);

    // TODO need this wrap at all?
    const handleChangeWrap: SignInFormData["handleChangeWrap"] = useCallback((event, cb) => {
        cb(event);
    }, []);

    const yandexAuthUrl = `${AUTH_BASE_URL}/yandex`;

    return useMemo(() => ({
        handleChangeWrap,
        handleSubmit,
        isPending: Boolean(pending),
        yandexAuthUrl,
    }), [handleChangeWrap, handleSubmit, pending, yandexAuthUrl]);
};
