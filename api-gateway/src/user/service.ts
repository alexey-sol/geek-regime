import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
    catchError, firstValueFrom, map,
} from "rxjs";
import { HasId, resources } from "@eggziom/geek-regime-js-commons";

import { AppConfig } from "@/config/type";
import type { AuthenticateRequest, CreateUserRequest, UserResponse } from "@/user/model/dto";
import type { ResponseDataGetter } from "@/shared/type/api";

import { getUsersApiPath } from "./api";

@Injectable()
export class UsersService {
    private readonly apiPath: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService<AppConfig, true>,
    ) {
        const apiUsersCf = this.configService.get("apiUsers", { infer: true });
        this.apiPath = getUsersApiPath(apiUsersCf);
    }

    async createUser(request: CreateUserRequest): Promise<UserResponse> {
        return firstValueFrom(
            this.httpService
                .post(this.apiPath, request)
                .pipe(this.getData<UserResponse>())
                .pipe(catchError((error) => {
                    throw error;
                })),
        );
    }

    async findUserById(id: HasId["id"]): Promise<UserResponse> {
        return firstValueFrom(
            this.httpService
                .get(this.findUserByIdApiPath(id))
                .pipe(this.getData<UserResponse>())
                .pipe(catchError((error) => {
                    throw error;
                })),
        );
    }

    private findUserByIdApiPath = (id: HasId["id"]) => `${this.apiPath}/${id}`;

    async findUserByEmail(email: string): Promise<UserResponse> {
        return firstValueFrom(
            this.httpService
                .get(this.findUserByEmailApiPath(email))
                .pipe(this.getData<UserResponse>())
                .pipe(catchError((error) => {
                    throw error;
                })),
        );
    }

    private findUserByEmailApiPath = (email: string) => `${this.apiPath}/email/${email}`;

    async authenticate(email: string, password: string): Promise<UserResponse> {
        const request: AuthenticateRequest = { email, password };

        return firstValueFrom(
            this.httpService
                .post(this.getAuthenticateApiPath(), request)
                .pipe(this.getData<UserResponse>())
                .pipe(catchError((error) => {
                    throw error;
                })),
        );
    }

    private getAuthenticateApiPath = () => `${this.apiPath}/${resources.AUTH}`;

    private getData: ResponseDataGetter = () => map((res) => res.data);
}
