import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

import {
    apiAggregatorConfig,
    apiGatewayConfig,
    apiPostsConfig,
    apiUsersConfig,
    clientWebConfig,
    validationPipeConfig,
} from "@/config";
import { createServeStaticModuleOptions } from "@/app/utils";
import { validate } from "@/config/utils/validation";
import type { AppConfigService } from "@/config/types";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [apiAggregatorConfig, apiGatewayConfig, apiPostsConfig, apiUsersConfig,
                clientWebConfig, validationPipeConfig],
            validate,
        }),
        ServeStaticModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: AppConfigService) => {
                const apiGatewayPrefix = configService.get("apiGateway.prefix", { infer: true });
                return createServeStaticModuleOptions(apiGatewayPrefix);
            },
        }),
    ],
})
export class AppModule {}
