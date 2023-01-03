import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import cookieParser from "cookie-parser";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { getUseContainerOptions } from "@/app/utils";
import { ApiExceptionFilter } from "@/exceptions/filters";
import { AppProxyMiddleware } from "@/config";
import type { AppConfig } from "@/config/types";

import { AppModule } from "./app";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
    const validationPipeConfig = configService.get("validationPipe", { infer: true });
    const apiGatewayConfig = configService.get("apiGateway", { infer: true });

    useContainer(app.select(AppModule), getUseContainerOptions());
    app.useGlobalFilters(new ApiExceptionFilter());
    app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
    app.setGlobalPrefix(apiGatewayConfig.prefix);
    app.use(cookieParser());
    app.use(new AppProxyMiddleware(configService).getResult());

    await app.listen(apiGatewayConfig.port);
}

bootstrap().catch((error) => Logger.error(error));
