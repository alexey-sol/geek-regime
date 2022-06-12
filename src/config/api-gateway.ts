import { registerAs } from "@nestjs/config";

const { env } = process;

export const apiGatewayConfig = registerAs("apiGateway", () => ({
    apiGatewayPort: parseInt(env.API_GATEWAY_PORT, 10),
    apiGatewayPrefix: env.API_GATEWAY_PREFIX,
    apiGatewayUrl: `http://${env.API_GATEWAY_HOST_EXTERNAL}:${env.API_GATEWAY_PORT_EXTERNAL}`,
    apiGatewayVersion: parseInt(env.API_GATEWAY_VERSION, 10),
    clientWebUrl: `http://${env.CLIENT_WEB_HOST_EXTERNAL}:${env.CLIENT_WEB_PORT_EXTERNAL}`,
}));
