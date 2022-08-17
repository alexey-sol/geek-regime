import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { envSchema } from "@/config/config.validation";
import { apiGatewayConfig } from "@/config/api-gateway";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "path";
import { apiPostsConfig } from "@/config/api-posts";
import { apiUsersConfig } from "@/config/api-users";
import { clientWebConfig } from "@/config/client-web";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as constants from "./app.const";

const root = process.cwd();

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

                return [{
                    exclude: [`/${apiGatewayPrefix}*`],
                    rootPath: path.join(root, "..", constants.PUBLIC_DIR),
                    serveRoot: `/${constants.PUBLIC_DIR}`,
                }];
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
