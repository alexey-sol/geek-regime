import { useTranslation } from "react-i18next";
import { type FormikConfig } from "formik";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { toCreateUserRequest } from "@/features/auth/utils/converters";
import { type CreateUserRequest } from "@/features/users/models/dtos";
import { type AuthFormProps } from "@/features/auth/types";
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { useAppDispatch } from "@/app/store/hooks";

export type SignUpValues = Pick<CreateUserRequest, "email" | "password">
    & Pick<CreateUserRequest["details"], "name">
    & { confirmPassword: string };

type UseSignUpFormResult = {
    handleSubmit: FormikConfig<SignUpValues>["onSubmit"];
    isPending: boolean;
};

export const useSignUpForm = (
    { onSubmit }: Pick<AuthFormProps, "onSubmit">,
): UseSignUpFormResult => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { pending, signUp } = useAuthContext();

    const handleSubmit: UseSignUpFormResult["handleSubmit"] = (values) => {
        signUp(toCreateUserRequest(values)).unwrap()
            .then(() => {
                onSubmit?.();
                dispatch(notify(createSuccessSnackbarArg(t("auth.signUp.query.success"))));
            })
            .catch(console.error);
    };

    return {
        handleSubmit,
        isPending: Boolean(pending),
    };
};
