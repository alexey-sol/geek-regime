import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import {
    catchError, firstValueFrom, map,
} from "rxjs";
import { type HasId, resources } from "@eggziom/geek-regime-js-utils";

import { getUsersApiPath } from "./api";

import { type AppConfig } from "@/config/type";
import {
    type AuthenticateRequest,
    type CreateEmailConfirmationRequest,
    type CreateUserRequest,
    type EmailConfirmationResponse,
    type ConfirmEmailRequest,
    type UserResponse,
} from "@/user/model/dto";
import { type ResponseDataGetter } from "@/shared/type/api";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
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
                    this.logger.error(error);
                    throw error;
                })),
        );
    }

    async getEmailConfirmationCodeByEmail(email: string): Promise<EmailConfirmationResponse> {
        return firstValueFrom(
            this.httpService
                .get(this.emailConfirmationApiPath(), {
                    params: { email },
                })
                .pipe(this.getData<EmailConfirmationResponse>())
                .pipe(catchError((error) => {
                    this.logger.error(error);
                    throw error;
                })),
        );
    }

    async createEmailConfirmation(request: CreateEmailConfirmationRequest): Promise<EmailConfirmationResponse> {
        return firstValueFrom(
            this.httpService
                .post(this.emailConfirmationApiPath(), request)
                .pipe(this.getData<EmailConfirmationResponse>())
                .pipe(catchError((error) => {
                    this.logger.error(error);
                    throw error;
                })),
        );
    }

    async confirmEmail(request: ConfirmEmailRequest): Promise<void> {
        await firstValueFrom(
            this.httpService
                .patch(this.emailConfirmationApiPath(), request)
                .pipe(catchError((error) => {
                    this.logger.error(error);
                    throw error;
                })),
        );
    }

    private emailConfirmationApiPath = () => `${this.apiPath}/${resources.CONFIRMATION}/email`;

    async findUserById(id: HasId["id"]): Promise<UserResponse> {
        return firstValueFrom(
            this.httpService
                .get(this.findUserByIdApiPath(id))
                .pipe(this.getData<UserResponse>())
                .pipe(catchError((error) => {
                    this.logger.error(error);
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
                    this.logger.error(error);
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
                    this.logger.error(error);
                    throw error;
                })),
        );
    }

    private getAuthenticateApiPath = () => `${this.apiPath}/${resources.AUTH}`;

    private getData: ResponseDataGetter = () => map((res) => res.data);
}
