import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { type AuthForm, type AuthView, type MemoizedAuthForm } from "@/features/auth/types";

import { SignUpForm } from "../sign-up-form";
import { SignInForm } from "../sign-in-form";

const INITIAL_VIEW: AuthView = "sign-in";

export type UseAuthDialogResult = {
    Form: AuthForm | MemoizedAuthForm;
    goTo: (view: AuthView) => void;
    handleGoBack?: () => void;
    title: string;
};

export const useAuthDialog = (): UseAuthDialogResult => {
    const { t } = useTranslation();
    const [view, setView] = useState<AuthView>(INITIAL_VIEW);

    let Form: AuthForm | MemoizedAuthForm;
    let title: string;
    let handleGoBack: UseAuthDialogResult["handleGoBack"] | undefined;

    switch (view) {
        case "sign-up":
            Form = SignUpForm;
            title = t("auth.signUp.title");
            handleGoBack = () => setView("sign-in");
            break;
        case INITIAL_VIEW:
        default:
            Form = SignInForm;
            title = t("auth.signIn.title");
            break;
    }

    return useMemo(() => ({
        Form,
        goTo: setView,
        handleGoBack,
        title,
    }), [Form, handleGoBack, title]);
};
