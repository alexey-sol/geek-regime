import type { RequestHandler } from "express";

import { getResource } from "@/shared/utils/url";

/**
 * @param {RequestHandler} middleware - The request handler.
 * @param {Array.<string>} resourcesToIgnore - The list of resources whose presence in "req.path"
 * makes the request to be skipped.
 */
export const unless = (
    middleware: RequestHandler,
    resourcesToIgnore: string[],
): RequestHandler => (req, res, next) => {
    const resource = getResource(req.path, resourcesToIgnore);
    const shouldSkip = Boolean(resource);

    return shouldSkip
        ? next()
        : middleware(req, res, next);
};
