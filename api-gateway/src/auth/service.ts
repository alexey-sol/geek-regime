import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { isAxiosError } from "axios";
import type { CreateUserDto, HasId } from "js-commons";

import { UsersService } from "@/users/service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    createUser = async (dto: CreateUserDto) => this.usersService.createUser(dto);

    getProfile = async (id: HasId["id"]) => this.usersService.findUserById(id);

    createOrFindUser = async (dto: CreateUserDto) => {
        try {
            return await this.usersService.createUser(dto);
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const userAlreadyExists = error.response?.status === HttpStatus.CONFLICT;

                if (userAlreadyExists) {
                    return this.usersService.findUserByEmail(dto.email);
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
