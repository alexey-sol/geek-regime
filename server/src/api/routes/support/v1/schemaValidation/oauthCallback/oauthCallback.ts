import { RequestHandler } from "express";

import paramsSchema from "./schemas/params";

const oauthCallback: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { error, value } = paramsSchema.validate(request.params);

    if (error) {
        return next(error);
    }

    request.params = value;
    next();
};

export default oauthCallback;
