import {
    Controller, Req, Post, UseGuards, Get, Res,
} from "@nestjs/common";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "@/auth/service";
import { AppConfig } from "@/config/types";
import type { AuthRequest } from "@/auth/types";

import * as cns from "./const";
import { JwtAuthGuard, LocalAuthGuard } from "./guards";

@Controller(`v*/${cns.AUTH_ROUTE}`)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService<AppConfig, true>,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("signIn")
    async signIn(
        @Req() req: AuthRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        // LocalStrategy's validate method gets called; it attaches "user" to request
        // (or throws unauthorized exception).
        const userId = req.user.id;
        const { accessToken } = this.authService.signIn(userId);

        this.setAuthCookie(res, accessToken);
        return { id: userId };
    }

    private setAuthCookie(res: Response, accessToken: string) {
        res.cookie(cns.AUTH_TOKEN_KEY, accessToken, {
            httpOnly: true,
            maxAge: this.getMaxAge(),
        });
    }

    private getMaxAge() {
        const dayInMs = 24 * 60 * 60 * 1000;
        const jwtExpiresIn = this.configService.get("auth.jwtExpiresIn", { infer: true });
        const hasSetExpirationTimeInDays = jwtExpiresIn?.endsWith("d");

        if (hasSetExpirationTimeInDays) {
            const days = parseInt(jwtExpiresIn, 10);
            return days * dayInMs;
        }

        return dayInMs;
    }

    @Post("signOut")
    async signOut(@Res({ passthrough: true }) res: Response) {
        AuthController.resetAuthCookie(res);
        return true;
    }

    private static resetAuthCookie(res: Response) {
        res.clearCookie(cns.AUTH_TOKEN_KEY);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getProfile(@Req() req: AuthRequest) {
        const userId = req.user?.id;
        return this.authService.getProfile(userId);
    }
}
