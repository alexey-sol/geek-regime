import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UsersModule } from "@/user/module";
import { LocalStrategy } from "@/auth/strategy/local";
import { AppConfig } from "@/config/type";
import { JwtStrategy } from "@/auth/strategy/jwt";
import { YandexStrategy } from "@/auth/strategy/yandex";

import { AuthService } from "./service";
import { AuthControllerV1 } from "@/auth/controller/v1";

@Module({
    controllers: [AuthControllerV1],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<AppConfig, true>) => {
                const authConfig = configService.get("auth", { infer: true });

                return ({
                    secret: authConfig.jwtSecret,
                    signOptions: {
                        expiresIn: authConfig.jwtExpiresIn,
                    },
                });
            },
        })],
    providers: [AuthService, LocalStrategy, JwtStrategy, YandexStrategy],
})
export class AuthModule {}
