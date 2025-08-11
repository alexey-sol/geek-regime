import path from "path";

import { ConfigService } from "@nestjs/config";
import { VersioningType } from "@nestjs/common";
import type { VersioningOptions } from "@nestjs/common";

import * as ct from "./const";

import { type AppConfig } from "@/config/type";

export const getUseContainerOptions = () => ({
    fallbackOnErrors: true, // [1]
});

export const getCorsOptions = (configService: ConfigService<AppConfig, true>) => ({
    allowedHeaders: "Content-Type, Accept",
    credentials: true,
    methods: ["GET", "POST"],
    origin: [
        configService.get("apiGateway", { infer: true }).baseUrlExternal,
        configService.get("clientWeb", { infer: true }).baseUrlExternal,
    ],
});

export const getVersioningOptions = (): VersioningOptions => ({
    defaultVersion: ct.DEFAULT_API_VERSION,
    type: VersioningType.URI,
});

const defaultRoot = process.cwd();

export const createServeStaticModuleOptions = (root = defaultRoot) => [{
    exclude: ["/api/*"],
    rootPath: path.join(root, "..", ct.PUBLIC_DIR),
    serveRoot: `/${ct.PUBLIC_DIR}`,
}];

// [1]. Allows to inject dependencies into @ValidatorConstraint as described here:
// https://github.com/nestjs/nest/issues/528#issuecomment-395338798
