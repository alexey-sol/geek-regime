import { registerAs } from "@nestjs/config";
import { NodeEnv } from "@/shared/const/node-env";

const isProduction = process.env.NODE_ENV === NodeEnv.PRODUCTION;

export const validationPipe = registerAs("validationPipe", () => ({
    disableErrorMessages: isProduction,
    forbidUnknownValues: true,
}));
