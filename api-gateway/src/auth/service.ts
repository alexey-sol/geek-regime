import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { isAxiosError } from "axios";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { MailerService } from "@/mailer/service";
import { UsersService } from "@/user/service";
import {
    type CreateEmailConfirmationRequest,
    type CreateUserRequest,
    type ConfirmEmailRequest,
} from "@/user/model/dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    createUser = (request: CreateUserRequest) => this.usersService.createUser(request);

    getEmailConfirmationCodeByEmail = (email: string) =>
        this.usersService.getEmailConfirmationCodeByEmail(email);

    createEmailConfirmation = (request: CreateEmailConfirmationRequest) =>
        this.usersService.createEmailConfirmation(request);

    confirmEmail = (request: ConfirmEmailRequest) => this.usersService.confirmEmail(request);

    getProfile = (id: HasId["id"]) => this.usersService.findUserById(id);

    createOrFindUser = async (request: CreateUserRequest) => {
        try {
            return await this.usersService.createUser(request);
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const userAlreadyExists = error.response?.status === HttpStatus.CONFLICT;

                if (userAlreadyExists) {
                    return this.findUserByEmail(request.email);
                }
            }

            throw error;
        }
    };

    findUserByEmail = (email: string) => this.usersService.findUserByEmail(email);

    validateUser = async (email: string, password: string): Promise<HasId | null> => {
        const user = await this.usersService.authenticate(email, password);
        return user ?? null;
    };

    signToken = (userId: HasId["id"]) => ({
        accessToken: this.jwtService.sign({ sub: userId }),
    });

    sendConfirmationEmail = (arg: Required<ConfirmEmailRequest>): Promise<void> =>
        this.mailerService.sendConfirmationEmail(arg);
}
