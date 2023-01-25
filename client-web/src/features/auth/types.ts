import { MemoExoticComponent } from "react";

export type AuthView = "sign-in" | "sign-up";

export type AuthFormProps = {
    goTo: (view: AuthView) => void;
};

export type AuthForm = (props: AuthFormProps) => JSX.Element;

export type MemoizedAuthForm = MemoExoticComponent<AuthForm>;
