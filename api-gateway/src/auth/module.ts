import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UsersModule } from "@/users/module";
import { LocalStrategy } from "@/auth/strategies/local";
import { AppConfig } from "@/config/types";
import { JwtStrategy } from "@/auth/strategies/jwt";

import { AuthService } from "./service";
import { AuthController } from "./controller";

@Module({
    controllers: [AuthController],
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
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
