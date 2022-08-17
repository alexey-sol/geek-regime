import { registerAs } from "@nestjs/config";

const { env } = process;

export const apiGatewayConfig = registerAs("apiGateway", () => ({
    port: parseInt(env.API_GATEWAY_PORT, 10),
    prefix: env.API_GATEWAY_PREFIX,
}));
