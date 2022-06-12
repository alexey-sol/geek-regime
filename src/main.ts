import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { useContainer } from "class-validator";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);
    const validationOptions = configService.get<ValidationPipeOptions>("validationPipe");
    const apiGatewayPrefix = configService.get<string>("apiGateway.apiGatewayPrefix");
    const apiGatewayVersion = configService.get<string>("apiGateway.apiGatewayVersion");
    const apiGatewayPort = configService.get<number>("apiGateway.apiGatewayPort");

    useContainer(app.select(AppModule), { fallbackOnErrors: true }); // [1]
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.setGlobalPrefix(`${apiGatewayPrefix}/${apiGatewayVersion}`);

    await app.listen(apiGatewayPort);
}

bootstrap().catch((error) => Logger.error(error));

// [1]. Allows to inject dependencies into @ValidatorConstraint as described here:
// https://github.com/nestjs/nest/issues/528#issuecomment-395338798
