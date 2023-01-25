import type { SignUpDto } from "@/features/users/models/dtos";
import type { SignUpValues } from "@/features/auth/components/sign-up-form/utils";

export const fromSignUpValuesToDto = ({
    email,
    name,
    password,
}: SignUpValues): SignUpDto => ({
    details: { name },
    email,
    password,
});
