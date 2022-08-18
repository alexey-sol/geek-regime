import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { envSchema } from "@/config/config.validation";
import { apiGatewayConfig } from "@/config/api-gateway";
import { ServeStaticModule } from "@nestjs/serve-static";
import { apiPostsConfig } from "@/config/api-posts";
import { apiUsersConfig } from "@/config/api-users";
import { clientWebConfig } from "@/config/client-web";
import { getServeStaticModuleOptions } from "@/app/app.utils";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [apiGatewayConfig, apiPostsConfig, apiUsersConfig, clientWebConfig],
            validationSchema: envSchema,
        }),
        ServeStaticModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const apiGatewayPrefix = configService.get<string>("apiGateway.prefix");
                return getServeStaticModuleOptions(apiGatewayPrefix);
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
