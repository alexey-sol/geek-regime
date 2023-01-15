import React, {
    useCallback,
    useMemo,
    type FormEvent,
    type FormEventHandler,
} from "react";
import type { FormikProps } from "formik";

import { YandexConsentScreen } from "@/features/auth/utils/oauth-consent-screen";
import { useAuthContext } from "@/features/auth/contexts/auth";
import type { SignInArg } from "@/features/auth/services/api/types";

export type SignInDialogData = {
    handleAction: () => void;
    handleChangeWrap: (event: FormEvent, cb: FormEventHandler) => void;
    handleSubmit: (values: SignInArg) => void;
    isPending: boolean;
    openWindowToSignInViaYandex: () => void;
};

export const useSignInDialogData = ({ formRef }: {
    formRef: React.RefObject<FormikProps<SignInArg>>;
}) => {
    const { isPending, signIn } = useAuthContext();

    const handleAction = useCallback(() => {
        const values = formRef.current?.values;

        if (values) {
            signIn(values);
        }
    }, [formRef, signIn]);

    const handleSubmit: SignInDialogData["handleSubmit"] = useCallback((values) => {
        if (values) {
            signIn(values);
        }
    }, [signIn]);

    const handleChangeWrap: SignInDialogData["handleChangeWrap"] = useCallback((event, cb) => {
        // TODO show notification on error
        cb(event);
    }, []);

    const openWindowToSignInViaYandex = () => {
        const consentScreen = new YandexConsentScreen();
        consentScreen.openWindow();
    };

    return useMemo(() => ({
        handleAction,
        handleChangeWrap,
        handleSubmit,
        isPending,
        openWindowToSignInViaYandex,
    }), [handleAction, handleChangeWrap, handleSubmit, isPending]);
};
