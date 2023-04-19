import type { Request } from "@nestjs/common";
import type { CreateUserDto, HasId } from "js-commons";

export type LocalAuthRequest = Request & {
    user: HasId;
};

export type YandexAuthRequest = Request & {
    user?: CreateUserDto;
};
