import { resources } from "@eggziom/geek-regime-js-commons";
import { type FormikConfig } from "formik";
import { useNavigate } from "react-router";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { createConfirmationEmailPath } from "@/features/auth/utils/helpers";
import { API_PREFIX } from "@/shared/const";
import { type AuthFormProps } from "@/features/auth/types";
import { type AuthenticateRequest } from "@/features/users/models/dtos";

export const AUTH_BASE_URL = `${API_PREFIX}/v1/${resources.AUTH}`;

type UseSignInFormResult = {
    handleSubmit: FormikConfig<AuthenticateRequest>["onSubmit"];
    isPending: boolean;
    yandexAuthUrl: string;
};

export const useSignInForm = (
    { onSubmit }: Pick<AuthFormProps, "onSubmit">,
): UseSignInFormResult => {
    const navigate = useNavigate();
    const { pending, signIn } = useAuthContext();

    const handleSubmit: UseSignInFormResult["handleSubmit"] = (values) => {
        signIn(values).unwrap()
            .then(({ confirmation }) => {
                onSubmit?.();

                if (confirmation === "email") {
                    navigate(createConfirmationEmailPath(values.email));
                }
            })
            .catch(console.error);
    };

    const yandexAuthUrl = `${AUTH_BASE_URL}/yandex`;

    return {
        handleSubmit,
        isPending: Boolean(pending),
        yandexAuthUrl,
    };
};
