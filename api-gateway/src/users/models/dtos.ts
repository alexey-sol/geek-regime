import type { CreateUserDto } from "js-commons";

export type AuthenticateDto = NonNullable<Pick<CreateUserDto, "email" | "password">>;
