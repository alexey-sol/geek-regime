import { FORBIDDEN } from "http-status";
import { RequestHandler } from "express";

import { INVALID_CREDENTIALS, NOT_VERIFIED } from "#utils/const/validationErrors";
import UnauthorizedError from "#utils/errors/UnauthorizedError";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import isValidPassword from "#utils/helpers/isValidPassword";

const postSession: RequestHandler = async (
    { body, ip },
    response,
    next
): Promise<void> => {
    const { email, password } = body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new UserError(INVALID_CREDENTIALS, FORBIDDEN, ip);
        }

        const passwordIsValid = user.hasPassword && await isValidPassword(password, user.id);

        if (!passwordIsValid) {
            throw new UserError(INVALID_CREDENTIALS, FORBIDDEN, ip);
        }

        if (!user.isConfirmed) {
            throw new UnauthorizedError(NOT_VERIFIED, ip, { email });
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default postSession;
