import { ConfigService, registerAs } from "@nestjs/config";
import { NotFoundException } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";
import type { Request, RequestHandler } from "express";
import { resources } from "@eggziom/geek-regime-js-commons";

import { NodeEnv } from "@/shared/const";
import { getResource } from "@/shared/util/url";
import type { AppConfig } from "@/config/type";
import { unless } from "@/config/util/handler";
import { validatedEnv, validatedEnv as env } from "@/config/util/validation";

import * as ct from "./const";

export const authConfig = registerAs(ct.AUTH, () => ({
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    jwtSecret: env.JWT_SECRET,
    yandexClientId: env.YANDEX_CLIENT_ID,
    yandexClientSecret: env.YANDEX_CLIENT_SECRET,
}));

export const apiAggregatorConfig = registerAs(ct.API_AGGREGATOR, () => ({
    baseUrl: `${ct.URL_SCHEME}://${env.API_AGGREGATOR_HOST}:${
        env.API_AGGREGATOR_PORT}`,
}));

export const apiGatewayConfig = registerAs(ct.API_GATEWAY, () => ({
    baseUrlExternal: `${ct.URL_SCHEME}://${env.API_GATEWAY_HOST_EXTERNAL}:${
        env.API_GATEWAY_PORT_EXTERNAL}`,
    port: env.API_GATEWAY_PORT,
}));

export const apiPostsConfig = registerAs(ct.API_POSTS, () => ({
    baseUrl: `${ct.URL_SCHEME}://${env.API_POSTS_HOST}:${env.API_POSTS_PORT}`,
}));

export const apiUsersConfig = registerAs(ct.API_USERS, () => ({
    baseUrl: `${ct.URL_SCHEME}://${env.API_USERS_HOST}:${env.API_USERS_PORT}`,
}));

export const clientWebConfig = registerAs(ct.CLIENT_WEB, () => ({
    baseUrlExternal: `${ct.URL_SCHEME}://${env.CLIENT_WEB_HOST_EXTERNAL}:${
        env.CLIENT_WEB_PORT_EXTERNAL}`,
}));

export const mailerConfig = registerAs(ct.MAILER, () => ({
    apiKey: env.MAILER_API_KEY,
    endpoint: env.MAILER_ENDPOINT,
    senderEmail: env.MAILER_SENDER_EMAIL,
}));

export const processConfig = registerAs(ct.PROCESS, () => ({
    appName: env.APP_NAME,
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
    private static readonly TARGET_URL = "http://localhost";
    private static readonly RESOURCES_TO_IGNORE = [resources.AUTH, resources.CONFIRMATION];
    private static readonly KNOWN_RESOURCES = [
        resources.AUTH, resources.COMMENTS, resources.CONFIRMATION, resources.POSTS,
        resources.SPACES, resources.USERS,
    ];

    constructor(private readonly configService: ConfigService<AppConfig, true>) {}

    getResult = (): RequestHandler => unless(createProxyMiddleware({
        changeOrigin: true,
        onProxyReq: async (proxyReq) => proxyReq,
        target: AppProxyMiddleware.TARGET_URL,
        router: this.getRouter,
    }), AppProxyMiddleware.RESOURCES_TO_IGNORE);

    private getRouter = (req: Request) => {
        const resource = getResource(req.path, AppProxyMiddleware.KNOWN_RESOURCES);
        const proxyTable = this.getProxyTable();
        const proxyTableKey = `/${resource}`;
        const proxyRoute = proxyTable[proxyTableKey];

        if (proxyRoute) {
            return proxyRoute;
        }

        throw new NotFoundException(`Cannot ${req.method} ${req.path}`);
    };

    private getProxyTable = () => {
        const apiAggregatorCf = this.configService.get("apiAggregator", { infer: true });
        const apiPostsCf = this.configService.get("apiPosts", { infer: true });
        const apiUsersCf = this.configService.get("apiUsers", { infer: true });

        return {
            [`/${resources.COMMENTS}`]: apiAggregatorCf.baseUrl,
            [`/${resources.POSTS}`]: apiAggregatorCf.baseUrl,
            [`/${resources.SPACES}`]: apiPostsCf.baseUrl,
            [`/${resources.USERS}`]: apiUsersCf.baseUrl,
        };
    };
}
