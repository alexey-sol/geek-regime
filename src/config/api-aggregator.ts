import { registerAs } from "@nestjs/config";
import * as constants from "./config.const";

const { env } = process;

export const apiAggregatorConfig = registerAs("apiAggregator", () => ({
    baseUrl: `${constants.URL_SCHEME}://${env.API_AGGREGATOR_HOST}:${env.API_AGGREGATOR_PORT}`,
}));
