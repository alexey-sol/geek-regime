import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AppConfig } from "@/config/types";
import type { HasId } from "@/shared/types/props";

import * as ct from "../const";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService<AppConfig, true>) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJwt,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get("auth", { infer: true }).jwtSecret,
        });
    }

    async validate(payload: { sub: HasId["id"] }) {
        return { id: payload.sub };
    }

    private static extractJwt(req: Request): string | null {
        const hasToken = req.cookies && ct.AUTH_TOKEN_KEY in req.cookies;

        return (hasToken)
            ? req.cookies[ct.AUTH_TOKEN_KEY]
            : null;
    }
}
