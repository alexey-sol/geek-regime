import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "@/users/service";
import type { HasId } from "@/shared/types/props";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    createUser = async (dto: unknown) => this.usersService.createUser(dto);

    getProfile = async (id: number) => this.usersService.findUserById(id);

    validateUser = async (email: string, password: string): Promise<HasId | null> => {
        const user = await this.usersService.authenticate(email, password);
        return user ?? null;
    };

    signToken = (userId: HasId["id"]) => ({
        accessToken: this.jwtService.sign({ sub: userId }),
    });
}
