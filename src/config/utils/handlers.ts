import type { RequestHandler } from "express";

import { getResource } from "@/shared/utils/url";

export const unless = (
    middleware: RequestHandler,
    resourcesToIgnore: string[],
): RequestHandler => (req, res, next) => {
    const resource = getResource(req.path);
    const shouldSkip = resourcesToIgnore.includes(resource);

    return shouldSkip
        ? next()
        : middleware(req, res, next);
};
