import { PassportStrategy } from "@nestjs/passport";
import { Callback, Strategy } from "passport-yandex";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AppConfig } from "@/config/type";
import { fromYandexProfileToCreateUserDto } from "@/auth/util";
import { DEFAULT_API_VERSION } from "@/app/const";
import type { CreateUserRequest } from "@/user/model/dto";

const API_VERSION = `v${DEFAULT_API_VERSION}`;

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, "yandex") {
    constructor(private readonly configService: ConfigService<AppConfig, true>) {
        super({
            clientID: configService.get("auth").yandexClientId,
            clientSecret: configService.get("auth").yandexClientSecret,
            callbackURL: `${configService.get("apiGateway").baseUrlExternal}`
                + "/api"
                + `/${API_VERSION}/auth/yandex/redirect`,
        });
    }

    validate: Callback<CreateUserRequest> = (
        accessToken,
        refreshToken,
        profile,
        done,
    ) => {
        done(null, fromYandexProfileToCreateUserDto(profile));
    };
}
