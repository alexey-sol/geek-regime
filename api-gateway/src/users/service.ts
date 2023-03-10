import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
    catchError, firstValueFrom, map,
} from "rxjs";
import type { CreateUserDto, UserDto } from "js-commons/src/types/users";
import type { HasId } from "js-commons/src/types/props";

import { AppConfig } from "@/config/types";
import * as authCn from "@/auth/const";
import type { AuthenticateDto } from "@/users/models/dtos";
import type { ResponseDataGetter } from "@/shared/types/api";

import { getUsersApiPath } from "./api";

@Injectable()
export class UsersService {
    private readonly apiPath: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService<AppConfig, true>,
    ) {
        const apiUsersCg = this.configService.get("apiUsers", { infer: true });
        this.apiPath = getUsersApiPath(apiUsersCg);
    }

    async createUser(dto: CreateUserDto): Promise<UserDto> {
        return firstValueFrom(
            this.httpService
                .post(this.apiPath, dto)
                .pipe(this.getData<UserDto>())
                .pipe(catchError((error) => {
                    throw error;
                })),
        );
    }

    async findUser(idOrEmail: HasId["id"] | string): Promise<UserDto> {
        return firstValueFrom(
            this.httpService
                .get(this.findUserApiPath(idOrEmail))
                .pipe(this.getData<UserDto>())
                .pipe(catchError((error) => {
                    throw error;
                })),
        );
    }

    private findUserApiPath = (id: HasId["id"] | string) => `${this.apiPath}/${id}`;

    async authenticate(email: string, password: string): Promise<UserDto> {
        const dto: AuthenticateDto = { email, password };

        return firstValueFrom(
            this.httpService
                .post(this.getAuthenticateApiPath(), dto)
                .pipe(this.getData<UserDto>())
                .pipe(catchError((error) => {
                    throw error;
                })),
        );
    }

    private getAuthenticateApiPath = () => `${this.apiPath}/${authCn.AUTH_ROUTE}`;

    private getData: ResponseDataGetter = () => map((res) => res.data);
}
