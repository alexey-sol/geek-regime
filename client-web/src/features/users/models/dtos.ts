import type { CreateUserDto } from "@eggziom/geek-regime-js-commons";

export type SignInDto = NonNullable<Pick<CreateUserDto, "email" | "password">>;
