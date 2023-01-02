import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, map } from "rxjs";
import { ConfigService } from "@nestjs/config";

import { AppConfig } from "@/config/types";
import { getUsersApiPath } from "@/users/api";
import * as authConst from "@/auth/const";
import type { AuthenticateDto } from "@/users/models/dtos";
import type { HasId } from "@/shared/types/props";
import type { ResponseDataGetter } from "@/shared/types/api";

@Injectable()
export class UsersService {
    private readonly apiPath: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService<AppConfig, true>,
    ) {
        const apiUsersCfg = this.configService.get("apiUsers", { infer: true });
        this.apiPath = getUsersApiPath(apiUsersCfg);
    }

    async findUserById(id: number): Promise<HasId> {
        return firstValueFrom(
            this.httpService
                .get(this.findUserByIdApiPath(id))
                .pipe(this.getData<HasId>()),
        );
    }

    private findUserByIdApiPath = (id: number) => `${this.apiPath}/${id}`;

    async authenticate(email: string, password: string): Promise<HasId> {
        const dto: AuthenticateDto = { email, password };

        return firstValueFrom(
            this.httpService
                .post(this.getAuthenticateApiPath(), dto)
                .pipe(this.getData<HasId>()),
        );
    }

    private getAuthenticateApiPath = () => `${this.apiPath}/${authConst.AUTH_ROUTE}`;

    private getData: ResponseDataGetter = () => map((res) => res.data);
}
