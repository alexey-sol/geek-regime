import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { useContainer } from "class-validator";
import { NestExpressApplication } from "@nestjs/platform-express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getUseContainerOptions, ProxyMiddlewareOptions } from "@/app/app.utils";
import { AppModule } from "./app/app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);
    const validationOptions = configService.get<ValidationPipeOptions>("validationPipe");
    const apiGatewayPrefix = configService.get<string>("apiGateway.prefix");
    const apiGatewayPort = configService.get<number>("apiGateway.port");

    useContainer(app.select(AppModule), getUseContainerOptions());
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.setGlobalPrefix(apiGatewayPrefix);

    const proxyOptions = new ProxyMiddlewareOptions(configService);
    const proxyPath = proxyOptions.getProxyPath();
    const proxyOptionsResult = proxyOptions.getResult();
    app.use(proxyPath, createProxyMiddleware(proxyOptionsResult));

    await app.listen(apiGatewayPort);
}

bootstrap().catch((error) => Logger.error(error));
