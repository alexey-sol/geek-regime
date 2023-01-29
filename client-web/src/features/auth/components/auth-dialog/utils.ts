import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import type { AuthForm, AuthView, MemoizedAuthForm } from "@/features/auth/types";

const INITIAL_VIEW: AuthView = "sign-in";

export type AuthDialogData = {
    Form: AuthForm | MemoizedAuthForm;
    goTo: (view: AuthView) => void;
    title: string;
};

export const useAuthDialogData = (): AuthDialogData => {
    const { t } = useTranslation();
    const [view, setView] = useState<AuthView>(INITIAL_VIEW);

    let Form: AuthForm | MemoizedAuthForm;
    let titleKey: string;
    let handleGoBack: (() => void) | undefined;

    switch (view) {
        case "sign-up":
            Form = SignUpForm;
            titleKey = "signUp.wrap.title";
            handleGoBack = () => setView("sign-in");
            break;
        case INITIAL_VIEW:
        default:
            Form = SignInForm;
            titleKey = "signIn.wrap.title";
            break;
    }

    const title = t(titleKey);

    return useMemo(() => ({
        Form,
        goTo: setView,
        handleGoBack,
        title,
    }), [Form, handleGoBack, title]);
};
