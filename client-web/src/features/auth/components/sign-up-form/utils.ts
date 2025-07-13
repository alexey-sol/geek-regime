import { useTranslation } from "react-i18next";
import { type FormikConfig } from "formik";
import { useNavigate } from "react-router";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { toCreateUserRequest } from "@/features/auth/utils/converters";
import { type CreateUserRequest, type HasDisableEmailConfirmation } from "@/features/users/models/dtos";
import { type AuthFormProps } from "@/features/auth/types";
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { useAppDispatch } from "@/app/store/hooks";
import { createConfirmationEmailPath } from "@/features/auth/utils/helpers";

export type SignUpValues = Pick<CreateUserRequest, "email" | "password">
    & HasDisableEmailConfirmation
    & Pick<CreateUserRequest["details"], "name">
    & { confirmPassword: string };

type UseSignUpFormResult = {
    handleSubmit: FormikConfig<SignUpValues>["onSubmit"];
    isPending: boolean;
};

export const useSignUpForm = (
    { onSubmit }: Pick<AuthFormProps, "onSubmit">,
): UseSignUpFormResult => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { pending, signUp } = useAuthContext();

    const handleSubmit: UseSignUpFormResult["handleSubmit"] = (values) => {
        signUp(toCreateUserRequest(values)).unwrap()
            .then(({ confirmation }) => {
                onSubmit?.();

                if (confirmation === "email") {
                    navigate(createConfirmationEmailPath(values.email));
                } else if (!confirmation) {
                    dispatch(notify(createSuccessSnackbarArg(t("auth.signUp.query.success"))));
                }
            })
            .catch(console.error);
    };

    return {
        handleSubmit,
        isPending: Boolean(pending),
    };
};
