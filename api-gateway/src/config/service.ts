import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AppConfig } from "@/config/type";
import { NodeEnv } from "@/shared/const";

@Injectable()
export class ProcessConfigService {
    constructor(private configService: ConfigService<AppConfig, true>) {}

    get isProduction(): boolean {
        const env = this.configService.get("process.env", { infer: true });
        return env === NodeEnv.PRODUCTION;
    }
}
