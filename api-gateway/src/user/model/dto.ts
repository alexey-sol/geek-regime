import type { CreateUserDto } from "@eggziom/geek-regime-js-commons";

export type AuthenticateDto = NonNullable<Pick<CreateUserDto, "email" | "password">>;
