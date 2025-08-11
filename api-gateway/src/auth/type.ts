import type { HasId } from "@eggziom/geek-regime-js-utils";

import type { CreateUserRequest } from "@/user/model/dto";

export type LocalAuthRequest = Request & {
    user: HasId;
};

export type YandexAuthRequest = Request & {
    user?: CreateUserRequest;
};
