import { ConfigService, registerAs } from "@nestjs/config";
import { NotFoundException } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";
import type { Request, RequestHandler } from "express";

import { NodeEnv } from "@/shared/const";
import { getResource } from "@/shared/utils/url";
import * as authCn from "@/auth/const";
import type { AppConfig } from "@/config/types";

import { unless } from "./utils/handlers";
import { validatedEnv, validatedEnv as env } from "./utils/validation";
import * as ct from "./const";

export const authConfig = registerAs(ct.AUTH, () => ({
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    jwtSecret: env.JWT_SECRET,
}));

export const apiAggregatorConfig = registerAs(ct.API_AGGREGATOR, () => ({
    baseUrl: `${ct.URL_SCHEME}://${env.API_AGGREGATOR_HOST}:${
        env.API_AGGREGATOR_PORT}`,
}));

export const apiGatewayConfig = registerAs(ct.API_GATEWAY, () => ({
    port: env.API_GATEWAY_PORT,
    prefix: env.API_GATEWAY_PREFIX,
}));

export const apiPostsConfig = registerAs(ct.API_POSTS, () => ({
    baseUrl: `${ct.URL_SCHEME}://${env.API_POSTS_HOST}:${env.API_POSTS_PORT}`,
    resource: env.API_POSTS_RESOURCE,
}));

export const apiUsersConfig = registerAs(ct.API_USERS, () => ({
    baseUrl: `${ct.URL_SCHEME}://${env.API_USERS_HOST}:${env.API_USERS_PORT}`,
    prefix: env.API_USERS_PREFIX,
    resource: env.API_USERS_RESOURCE,
}));

export const clientWebConfig = registerAs(ct.CLIENT_WEB, () => ({
    baseUrl: `${ct.URL_SCHEME}://${env.CLIENT_WEB_HOST_EXTERNAL}:${
        env.CLIENT_WEB_PORT_EXTERNAL}`,
}));

export const processConfig = registerAs(ct.PROCESS, () => ({
    env: env.NODE_ENV,
}));

export const validationPipeConfig = registerAs("validationPipe", () => {
    const isProduction = validatedEnv.NODE_ENV === NodeEnv.PRODUCTION;

    return {
        disableErrorMessages: isProduction,
        forbidUnknownValues: true,
    };
});

export class AppProxyMiddleware {
    private static readonly targetUrl = "http://localhost";
    private static readonly resourcesToIgnore = [authCn.AUTH_ROUTE];

    constructor(private readonly configService: ConfigService<AppConfig, true>) {}

    getResult = (): RequestHandler => unless(createProxyMiddleware({
        changeOrigin: true,
        onProxyReq: async (proxyReq) => proxyReq,
        target: AppProxyMiddleware.targetUrl,
        router: this.getRouter,
    }), AppProxyMiddleware.resourcesToIgnore);

    private getRouter = (req: Request) => {
        const resource = getResource(req.path);
        const proxyTable = this.getProxyTable();
        const proxyTableKey = `/${resource}`;
        const proxyRoute = proxyTable[proxyTableKey];

        if (proxyRoute) {
            return proxyRoute;
        }

        throw new NotFoundException(`Cannot ${req.method} ${req.path}`);
    };

    private getProxyTable = () => {
        const apiAggregatorCg = this.configService.get("apiAggregator", { infer: true });
        const apiPostsCg = this.configService.get("apiPosts", { infer: true });
        const apiUsersCg = this.configService.get("apiUsers", { infer: true });

        return {
            [`/${apiPostsCg.resource}`]: apiAggregatorCg.baseUrl,
            [`/${apiUsersCg.resource}`]: apiUsersCg.baseUrl,
        };
    };
}
