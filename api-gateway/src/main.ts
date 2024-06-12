import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import cookieParser from "cookie-parser";
import "dotenv/config";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { getUseContainerOptions, getCorsOptions, getVersioningOptions } from "@/app/util";
import { AppProxyMiddleware } from "@/config";
import type { AppConfig } from "@/config/type";

import { AppModule } from "./app";

const GLOBAL_PREFIX = "api";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
    const validationPipeConfig = configService.get("validationPipe", { infer: true });
    const apiGatewayConfig = configService.get("apiGateway", { infer: true });

    useContainer(app.select(AppModule), getUseContainerOptions());
    app.enableCors(getCorsOptions(configService));
    app.enableVersioning(getVersioningOptions());
    app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
    app.setGlobalPrefix(GLOBAL_PREFIX);
    app.use(cookieParser());
    app.use(new AppProxyMiddleware(configService).getResult());

    await app.listen(apiGatewayConfig.port);
}

bootstrap().catch((error) => Logger.error(error));
