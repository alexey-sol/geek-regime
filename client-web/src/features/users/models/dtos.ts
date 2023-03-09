import type { CreateUserDto } from "js-commons/src/types/users";

export type SignInDto = NonNullable<Pick<CreateUserDto, "email" | "password">>;
