import { registerAs } from "@nestjs/config";
import { NotFoundException } from "@nestjs/common";
import type { Options } from "http-proxy-middleware";
import type { Request } from "express";

import { NodeEnv } from "@/shared/const";

import { validatedEnv, validatedEnv as env } from "./utils/validation";
import type { AppConfigService } from "./types";
import * as constants from "./const";

export const apiAggregatorConfig = registerAs(constants.API_AGGREGATOR, () => ({
    baseUrl: `${constants.URL_SCHEME}://${env.API_AGGREGATOR_HOST}:${
        env.API_AGGREGATOR_PORT}`,
}));

export const apiGatewayConfig = registerAs(constants.API_GATEWAY, () => ({
    port: env.API_GATEWAY_PORT,
    prefix: env.API_GATEWAY_PREFIX,
}));

export const apiPostsConfig = registerAs(constants.API_POSTS, () => ({
    baseUrl: `${constants.URL_SCHEME}://${env.API_POSTS_HOST}:${env.API_POSTS_PORT}`,
    resource: env.API_POSTS_RESOURCE,
}));

export const apiUsersConfig = registerAs(constants.API_USERS, () => ({
    baseUrl: `${constants.URL_SCHEME}://${env.API_USERS_HOST}:${env.API_USERS_PORT}`,
    resource: env.API_USERS_RESOURCE,
}));

export const clientWebConfig = registerAs(constants.CLIENT_WEB, () => ({
    baseUrl: `${constants.URL_SCHEME}://${env.CLIENT_WEB_HOST_EXTERNAL}:${
        env.CLIENT_WEB_PORT_EXTERNAL}`,
}));

export const validationPipeConfig = registerAs("validationPipe", () => {
    const isProduction = validatedEnv.NODE_ENV === NodeEnv.PRODUCTION;

    return {
        disableErrorMessages: isProduction,
        forbidUnknownValues: true,
    };
});

export class ProxyMiddlewareConfig {
    private static readonly targetUrl = "http://localhost";

    constructor(private readonly configService: AppConfigService) {}

    getProxyPath = () => {
        const apiGateway = this.configService.get("apiGateway", { infer: true });
        return `/${apiGateway.prefix}/v(\\d+)`;
    };

    getProxyPathToResource = () => `${this.getProxyPath()}/(\\w+)`;

    getResult = (): Options => ({
        changeOrigin: true,
        onProxyReq: async (proxyReq) => proxyReq,
        target: ProxyMiddlewareConfig.targetUrl,
        router: this.getRouter,
    });

    private getRouter = (req: Request) => {
        const resource = this.getResourceFromApiPath(req.url);
        const proxyTable = this.getProxyTable();
        const proxyTableKey = `/${resource}`;
        const proxyRoute = proxyTable[proxyTableKey];

        if (proxyRoute) {
            return proxyRoute;
        }

        throw new NotFoundException(`Cannot ${req.method} ${req.url}`);
    };

    private getResourceFromApiPath = (apiPath: string) => {
        const proxyPathToResourceRegExp = new RegExp(this.getProxyPathToResource());
        const pathWithoutPathVariable = proxyPathToResourceRegExp.exec(apiPath)?.[0];

        return pathWithoutPathVariable?.split("/")
            .slice(-1)
            .join();
    };

    private getProxyTable = () => {
        const apiPosts = this.configService.get("apiPosts", { infer: true });
        const apiUsers = this.configService.get("apiUsers", { infer: true });

        return {
            [`/${apiPosts.resource}`]: apiPosts.baseUrl,
            [`/${apiUsers.resource}`]: apiUsers.baseUrl,
        };
    };
}
