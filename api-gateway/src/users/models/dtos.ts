import type { CreateUserDto } from "js-commons/src/types/users";

export type AuthenticateDto = NonNullable<Pick<CreateUserDto, "email" | "password">>;
