import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { APP_FILTER } from "@nestjs/core";

import { createServeStaticModuleOptions } from "@/app/utils";
import { validate } from "@/config/utils/validation";
import { AuthModule } from "@/auth/module";
import { ProcessConfigService } from "@/config/service";
import * as cf from "@/config";
import type { AppConfig } from "@/config/types";

import { ApiExceptionFilter, HttpExceptionFilter } from "./handlers/exception.filters";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                cf.authConfig,
                cf.apiAggregatorConfig,
                cf.apiGatewayConfig,
                cf.apiPostsConfig,
                cf.apiUsersConfig,
                cf.clientWebConfig,
                cf.processConfig,
                cf.validationPipeConfig,
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
    providers: [
        ProcessConfigService,
        {
            provide: APP_FILTER,
            useClass: ApiExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
