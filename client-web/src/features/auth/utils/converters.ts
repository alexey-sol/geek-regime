import type { CreateUserDto } from "js-commons/src/types/users";

import type { SignUpValues } from "@/features/auth/components/sign-up-form/utils";

export const fromSignUpValuesToDto = ({
    email,
    name,
    password,
}: SignUpValues): CreateUserDto => ({
    details: { name },
    email,
    password,
});
