import { ConfigService } from "@nestjs/config";
import { Options } from "http-proxy-middleware";

const TARGET_URL = "http://localhost";

type Config = {
    apiPostsBaseUrl: string;
    apiPostsResource: string;
    apiUsersBaseUrl: string;
    apiUsersResource: string;
}

export class ProxyMiddlewareOptions {
    private readonly config: Config;

    constructor(private readonly configService: ConfigService) {
        this.config = {
            apiPostsBaseUrl: configService.get<string>("apiPosts.baseUrl"),
            apiPostsResource: configService.get<string>("apiPosts.resource"),
            apiUsersBaseUrl: configService.get<string>("apiUsers.baseUrl"),
            apiUsersResource: configService.get<string>("apiUsers.resource"),
        };
    }

    getResult(): Options {
        return {
            changeOrigin: true,
            target: TARGET_URL,
            router: {
                [`/${this.config.apiUsersResource}`]: this.config.apiUsersBaseUrl,
                [`/${this.config.apiPostsResource}`]: this.config.apiPostsBaseUrl,
            },
        };
    }
}
