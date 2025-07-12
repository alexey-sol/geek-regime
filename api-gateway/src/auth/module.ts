import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UsersModule } from "@/user/module";
import { LocalStrategy } from "@/auth/strategy/local";
import { AppConfig } from "@/config/type";
import { JwtStrategy } from "@/auth/strategy/jwt";
import { YandexStrategy } from "@/auth/strategy/yandex";
import { AuthControllerV1 } from "@/auth/controller/auth-v1";
import { ConfirmationControllerV1 } from "@/auth/controller/confirmation-v1";
import { MailerModule } from "@/mailer/module";

import { AuthService } from "./service";

@Module({
    controllers: [AuthControllerV1, ConfirmationControllerV1],
    imports: [
        MailerModule,
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
