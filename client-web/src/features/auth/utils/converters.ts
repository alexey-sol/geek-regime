import { type SignUpValues } from "@/features/auth/components/sign-up-form/utils";
import { type CreateUserRequest, type HasDisableEmailConfirmation } from "@/features/users/models/dtos";

export const toCreateUserRequest = ({
    name,
    ...rest
}: SignUpValues): CreateUserRequest & HasDisableEmailConfirmation => ({
    details: { name },
    ...rest,
});
