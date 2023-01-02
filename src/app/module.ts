import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

import * as cfg from "@/config";
import { createServeStaticModuleOptions } from "@/app/utils";
import { validate } from "@/config/utils/validation";
import { AuthModule } from "@/auth/module";
import type { AppConfig } from "@/config/types";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                cfg.authConfig,
                cfg.apiAggregatorConfig,
                cfg.apiGatewayConfig,
                cfg.apiPostsConfig,
                cfg.apiUsersConfig,
                cfg.clientWebConfig,
                cfg.validationPipeConfig,
            ],
            validate,
        }),
        ServeStaticModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<AppConfig, true>) => {
                const apiGatewayPrefix = configService.get("apiGateway.prefix", { infer: true });
                return createServeStaticModuleOptions(apiGatewayPrefix);
            },
        }),
        AuthModule,
    ],
})
export class AppModule {}
