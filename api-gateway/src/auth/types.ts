import type { Request } from "@nestjs/common";
import type { HasId } from "js-commons/src/types/props";
import type { CreateUserDto } from "js-commons/src/types/users";

export type LocalAuthRequest = Request & {
    user: HasId;
};

export type YandexAuthRequest = Request & {
    user?: CreateUserDto;
};
