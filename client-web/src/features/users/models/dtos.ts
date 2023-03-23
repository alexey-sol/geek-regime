import type { CreateUserDto } from "js-commons";

export type SignInDto = NonNullable<Pick<CreateUserDto, "email" | "password">>;
