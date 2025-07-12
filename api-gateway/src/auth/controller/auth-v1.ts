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
    HttpStatus,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { type HasId, resources } from "@eggziom/geek-regime-js-commons";
import { type Response } from "express";

import { AuthService } from "@/auth/service";
import { AppConfig } from "@/config/type";
import { type CreateUserRequest, type HasDisableEmailConfirmation } from "@/user/model/dto";
import { type LocalAuthRequest, type YandexAuthRequest } from "@/auth/type";
import { setAuthCookie } from "@/auth/util";
import { ConfirmationEmailSenderException } from "@/shared/util/exception";

import { JwtAuthGuard, LocalAuthGuard, YandexAuthGuard } from "../guard";
import * as ct from "../const";

@Controller({
    path: resources.AUTH,
    version: "1",
})
export class AuthControllerV1 {
    private readonly clientWebBaseUrl: string;
    private readonly jwtExpiresIn?: string;

    constructor(
        private readonly authService: AuthService,
        configService: ConfigService<AppConfig, true>,
    ) {
        this.clientWebBaseUrl = configService.get("clientWeb.baseUrlExternal", { infer: true });
        this.jwtExpiresIn = configService.get("auth.jwtExpiresIn", { infer: true });
    }

    @UseGuards(LocalAuthGuard)
    @Post("sign-in")
    async signIn(
        @Req() req: LocalAuthRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userId = req.user.id;
        const user = await this.authService.getProfile(userId);

        if (user.meta?.hasConfirmedEmail) {
            this.signAuthToken(res, userId);
            return user;
        }

        return res.status(HttpStatus.ACCEPTED).send();
    }

    @Post("sign-up")
    async signUp(
        @Body() request: CreateUserRequest & HasDisableEmailConfirmation,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { disableEmailConfirmation, ...updatedRequest } = request;

        const user = await this.authService.createUser(updatedRequest);

        const emailConfirmation = disableEmailConfirmation
            ? undefined
            : await this.authService.createEmailConfirmation({ email: user.email });

        if (emailConfirmation?.code) {
            try {
                await this.authService.sendConfirmationEmail({
                    code: emailConfirmation.code,
                    email: user.email,
                });
            } catch (error) {
                throw new ConfirmationEmailSenderException();
            }

            return res.status(HttpStatus.ACCEPTED).send();
        }

        this.signAuthToken(res, user.id);
        return this.authService.getProfile(user.id);
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
            url: this.clientWebBaseUrl,
        };
    }

    private signAuthToken(res: Response, userId: HasId["id"]) {
        const { accessToken } = this.authService.signToken(userId);
        setAuthCookie(res, accessToken, this.jwtExpiresIn);
    }
}
