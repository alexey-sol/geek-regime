import path from "path";
import { ConfigService } from "@nestjs/config";
import { Options } from "http-proxy-middleware";
import { ProxyMiddlewareOptionsConfig } from "@/app/app.types";
import { Request } from "express";
import { ResourceNotFoundException } from "@/exceptions";
import * as constants from "./app.const";

export const getUseContainerOptions = () => ({
    fallbackOnErrors: true, // [1]
});

const defaultRoot = process.cwd();

export const getServeStaticModuleOptions = (
    apiGatewayPrefix: string,
    root = defaultRoot,
) => [{
    exclude: [`/${apiGatewayPrefix}*`],
    rootPath: path.join(root, "..", constants.PUBLIC_DIR),
    serveRoot: `/${constants.PUBLIC_DIR}`,
}];

export class ProxyMiddlewareOptions {
    private readonly TARGET_URL = "http://localhost";
    private readonly config: ProxyMiddlewareOptionsConfig;

    constructor(private readonly configService: ConfigService) {
        this.config = {
            apiGatewayPrefix: configService.get<string>("apiGateway.prefix"),
            apiPostsBaseUrl: configService.get<string>("apiPosts.baseUrl"),
            apiPostsResource: configService.get<string>("apiPosts.resource"),
            apiUsersBaseUrl: configService.get<string>("apiUsers.baseUrl"),
            apiUsersResource: configService.get<string>("apiUsers.resource"),
        };
    }

    getProxyPath = () => `/${this.config.apiGatewayPrefix}/v(\\d+)`;

    getProxyPathToResource = () => `${this.getProxyPath()}/(\\w+)`;

    getResult = (): Options => ({
        changeOrigin: true,
        onProxyReq: async (proxyReq, req, res) =>
            proxyReq, // TODO check auth token when accessing private routes
        target: this.TARGET_URL,
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

        throw new ResourceNotFoundException(req.url, resource);
    };

    private getResourceFromApiPath = (apiPath: string) => {
        const proxyPathToResourceRegExp = new RegExp(this.getProxyPathToResource());
        const pathWithoutPathVariable = proxyPathToResourceRegExp.exec(apiPath)?.[0];

        return pathWithoutPathVariable.split("/")
            .slice(-1)
            .join();
    };

    private getProxyTable = () => ({
        [`/${this.config.apiPostsResource}`]: this.config.apiPostsBaseUrl,
        [`/${this.config.apiUsersResource}`]: this.config.apiUsersBaseUrl,
    });
}

// [1]. Allows to inject dependencies into @ValidatorConstraint as described here:
// https://github.com/nestjs/nest/issues/528#issuecomment-395338798
