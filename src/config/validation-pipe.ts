import { registerAs } from "@nestjs/config";
import * as nodeEnvConst from "@/const/node-env";

const isProduction = process.env.NODE_ENV === nodeEnvConst.PRODUCTION;

export const validationPipe = registerAs("validationPipe", () => ({
    disableErrorMessages: isProduction,
    forbidUnknownValues: true,
}));
