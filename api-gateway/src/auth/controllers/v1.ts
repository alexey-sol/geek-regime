import {
    Controller,
    Req,
    Post,
    UseGuards,
    Get,
    Res,
    Body,
    BadRequestException,
    Redirect,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import type { CreateUserDto, HasId } from "js-commons";

import { AuthService } from "@/auth/service";
import { AppConfig } from "@/config/types";
import type { LocalAuthRequest, YandexAuthRequest } from "@/auth/types";

import { JwtAuthGuard, LocalAuthGuard, YandexAuthGuard } from "../guards";
import * as ct from "../const";

@Controller({
    path: ct.AUTH_RESOURCE,
    version: "1",
})
export class AuthControllerV1 {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService<AppConfig, true>,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("sign-in")
    async signIn(
        @Req() req: LocalAuthRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userId = req.user.id;
        await this.signAuthToken(res, userId);
        return this.authService.getProfile(userId);
    }

    @Post("sign-up")
    async signUp(
        @Body() dto: CreateUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.createUser(dto);
        this.signAuthToken(res, user.id);
        return this.authService.getProfile(user.id);
    }

    private signAuthToken(res: Response, userId: HasId["id"]) {
        const { accessToken } = this.authService.signToken(userId);
        this.setAuthCookie(res, accessToken);
    }

    private setAuthCookie(res: Response, accessToken: string) {
        res.cookie(ct.AUTH_TOKEN_KEY, accessToken, {
            httpOnly: true,
            maxAge: this.getMaxAge(),
        });
    }

    private getMaxAge() {
        const dayInMs = 24 * 60 * 60 * 1000;
        const jwtExpiresIn = this.configService.get("auth.jwtExpiresIn", { infer: true });
        const isExpirationTimeInDays = jwtExpiresIn?.endsWith("d");

        if (isExpirationTimeInDays) {
            const days = parseInt(jwtExpiresIn, 10);
            return days * dayInMs;
        }

        return dayInMs;
    }

    @Post("sign-out")
    async signOut(@Res({ passthrough: true }) res: Response) {
        AuthControllerV1.resetAuthCookie(res);
        return true;
    }

    private static resetAuthCookie(res: Response) {
        res.clearCookie(ct.AUTH_TOKEN_KEY);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getProfile(@Req() req: LocalAuthRequest) {
        const userId = req.user?.id;
        return this.authService.getProfile(userId);
    }

    @Get("yandex")
    @UseGuards(YandexAuthGuard)
    async yandexAuth() {} // eslint-disable-line @typescript-eslint/no-empty-function

    @Get("yandex/redirect")
    @UseGuards(YandexAuthGuard)
    @Redirect()
    async yandexAuthRedirect(
        @Req() req: YandexAuthRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        if (!req.user) {
            throw new BadRequestException();
        }

        const user = await this.authService.createOrFindUser(req.user);
        this.signAuthToken(res, user.id);

        return {
            url: this.configService.get("clientWeb", { infer: true }).baseUrlExternal,
        };
    }
}
