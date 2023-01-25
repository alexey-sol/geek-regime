import React, { useCallback, useMemo } from "react";
import type { FormEvent, FormEventHandler } from "react";
import type { FormikProps } from "formik";

import { YandexConsentScreen } from "@/features/auth/utils/oauth-consent-screen";
import { useAuthContext } from "@/features/auth/contexts/auth";
import type { SignInDto } from "@/features/users/models/dtos";

export type SignInFormData = {
    handleChangeWrap: (event: FormEvent, cb: FormEventHandler) => void;
    handleSubmit: () => void;
    isPending: boolean;
    openWindowToSignInViaYandex: () => void;
};

export const useSignInFormData = (
    { formRef }: { formRef: React.RefObject<FormikProps<SignInDto>> },
): SignInFormData => {
    const { isPending, signIn } = useAuthContext();

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

    const openWindowToSignInViaYandex = () => {
        const consentScreen = new YandexConsentScreen();
        consentScreen.openWindow();
    };

    return useMemo(() => ({
        handleChangeWrap,
        handleSubmit,
        isPending,
        openWindowToSignInViaYandex,
    }), [handleChangeWrap, handleSubmit, isPending]);
};
