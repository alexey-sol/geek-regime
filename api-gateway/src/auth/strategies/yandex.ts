import { PassportStrategy } from "@nestjs/passport";
import { Callback, Strategy } from "passport-yandex";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { CreateUserDto } from "js-commons";

import { AppConfig } from "@/config/types";
import { fromYandexProfileToCreateUserDto } from "@/auth/utils";
import { API_VERSION_PREFIX } from "@/app/const";

const API_VERSION = "1";

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, "yandex") {
    constructor(private readonly configService: ConfigService<AppConfig, true>) {
        super({
            clientID: configService.get("auth").yandexClientId,
            clientSecret: configService.get("auth").yandexClientSecret,
            callbackURL: `${configService.get("apiGateway").baseUrlExternal}`
                + `/${configService.get("apiGateway").prefix}`
                + `/${API_VERSION_PREFIX}${API_VERSION}/auth/yandex/redirect`,
        });
    }

    validate: Callback<CreateUserDto> = (
        accessToken,
        refreshToken,
        profile,
        done,
    ) => {
        done(null, fromYandexProfileToCreateUserDto(profile));
    };
}
