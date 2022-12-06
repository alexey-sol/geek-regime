import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import { createProxyMiddleware } from "http-proxy-middleware";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { getUseContainerOptions } from "@/app/utils";
import { ApiExceptionFilter } from "@/exceptions/filters";
import { ProxyMiddlewareConfig } from "@/config";
import type { AppConfigService } from "@/config/types";

import { AppModule } from "./app";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get<AppConfigService>(ConfigService);
    const validationPipeConfig = configService.get("validationPipe", { infer: true });
    const apiGatewayConfig = configService.get("apiGateway", { infer: true });

    useContainer(app.select(AppModule), getUseContainerOptions());
    app.useGlobalFilters(new ApiExceptionFilter());
    app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
    app.setGlobalPrefix(apiGatewayConfig.prefix);

    const proxyOptions = new ProxyMiddlewareConfig(configService);
    const proxyPath = proxyOptions.getProxyPath();
    const proxyOptionsResult = proxyOptions.getResult();
    app.use(proxyPath, createProxyMiddleware(proxyOptionsResult));

    await app.listen(apiGatewayConfig.port);
}

bootstrap().catch((error) => Logger.error(error));
