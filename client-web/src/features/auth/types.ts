import { type MemoExoticComponent } from "react";
import type React from "react";

export type AuthView = "sign-in" | "sign-up";

export type AuthFormProps = {
    goTo?: (view: AuthView) => void;
    onSubmit?: () => void;
};

export type AuthForm = (props: AuthFormProps) => React.JSX.Element;

export type MemoizedAuthForm = MemoExoticComponent<AuthForm>;
