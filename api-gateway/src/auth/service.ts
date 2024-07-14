import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { isAxiosError } from "axios";
import type { HasId } from "@eggziom/geek-regime-js-commons";

import { UsersService } from "@/user/service";
import type { CreateUserRequest } from "@/user/model/dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    createUser = async (request: CreateUserRequest) => this.usersService.createUser(request);

    getProfile = async (id: HasId["id"]) => this.usersService.findUserById(id);

    createOrFindUser = async (request: CreateUserRequest) => {
        try {
            return await this.usersService.createUser(request);
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const userAlreadyExists = error.response?.status === HttpStatus.CONFLICT;

                if (userAlreadyExists) {
                    return this.usersService.findUserByEmail(request.email);
                }
            }

            throw error;
        }
    };

    validateUser = async (email: string, password: string): Promise<HasId | null> => {
        const user = await this.usersService.authenticate(email, password);
        return user ?? null;
    };

    signToken = (userId: HasId["id"]) => ({
        accessToken: this.jwtService.sign({ sub: userId }),
    });
}
