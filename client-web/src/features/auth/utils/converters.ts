import type { SignUpValues } from "@/features/auth/components/sign-up-form/utils";
import type { CreateUserRequest } from "@/features/users/models/dtos";

export const toCreateUserRequest = ({
    email,
    name,
    password,
}: SignUpValues): CreateUserRequest => ({
    details: { name },
    email,
    password,
});
