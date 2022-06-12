import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { envSchema } from "@/config/config.validation";
import { apiGatewayConfig } from "@/config/api-gateway";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [apiGatewayConfig],
            validationSchema: envSchema,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
