import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { APP_FILTER } from "@nestjs/core";

import { validate } from "@/config/util/validation";
import { AuthModule } from "@/auth/module";
import { ProcessConfigService } from "@/config/service";
import * as cf from "@/config";

import { createServeStaticModuleOptions } from "./util";
import { ApiExceptionFilter, HttpExceptionFilter } from "./handler/exception.filter";

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
                cf.mailerConfig,
                cf.processConfig,
                cf.validationPipeConfig,
            ],
            validate,
        }),
        ServeStaticModule.forRootAsync({
            inject: [ConfigService],
            useFactory: () => createServeStaticModuleOptions(),
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
