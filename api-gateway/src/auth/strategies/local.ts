import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { HasId } from "js-commons/src/types/props";

import { AuthService } from "../service";

const EMAIL_FIELD = "email";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: EMAIL_FIELD });
    }

    async validate(email: string, password: string): Promise<HasId> {
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
