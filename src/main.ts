import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { useContainer } from "class-validator";
import { NestExpressApplication } from "@nestjs/platform-express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ProxyMiddlewareOptions } from "@/shared/utils/options/proxy-middleware-options";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);
    const validationOptions = configService.get<ValidationPipeOptions>("validationPipe");
    const apiGatewayPrefix = configService.get<string>("apiGateway.prefix");
    const apiGatewayPort = configService.get<number>("apiGateway.port");

    useContainer(app.select(AppModule), { fallbackOnErrors: true }); // [1]
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.setGlobalPrefix(apiGatewayPrefix);

    const proxyMiddlewareOptions = new ProxyMiddlewareOptions(configService);
    const proxyPath = `/${apiGatewayPrefix}/v(\\d+)`;
    const proxyOptions = proxyMiddlewareOptions.getResult();
    app.use(proxyPath, createProxyMiddleware(proxyOptions));

    await app.listen(apiGatewayPort);
}

bootstrap().catch((error) => Logger.error(error));

// [1]. Allows to inject dependencies into @ValidatorConstraint as described here:
// https://github.com/nestjs/nest/issues/528#issuecomment-395338798
