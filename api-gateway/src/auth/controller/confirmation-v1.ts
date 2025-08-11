import {
    Controller, Get, HttpStatus, Query, Redirect, Res, UnprocessableEntityException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { type HasId, resources } from "@eggziom/geek-regime-js-utils";
import { type Response } from "express";

import { AuthService } from "../service";
import { setAuthCookie } from "../util";
import { paths } from "../const";

import { ConfirmationEmailSenderException } from "@/shared/util/exception";
import { type AppConfig } from "@/config/type";

@Controller({
    path: resources.CONFIRMATION,
    version: "1",
})
export class ConfirmationControllerV1 {
    private readonly clientWebBaseUrl: string;
    private readonly jwtExpiresIn?: string;

    constructor(
        private readonly authService: AuthService,
        configService: ConfigService<AppConfig, true>,
    ) {
        this.clientWebBaseUrl = configService.get("clientWeb.baseUrlExternal", { infer: true });
        this.jwtExpiresIn = configService.get("auth.jwtExpiresIn", { infer: true });
    }

    @Get("email/redirect")
    @Redirect()
    async confirmEmail(
        @Query("email") email: string,
        @Query("code") code: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        if (!email || !code) {
            throw new UnprocessableEntityException();
        }

        try {
            await this.authService.confirmEmail({ code, email });

            const user = await this.authService.findUserByEmail(email);
            this.signAuthToken(res, user.id);
        } catch (error) {
            return {
                url: this.clientWebBaseUrl,
            };
        }

        return {
            url: `${this.clientWebBaseUrl}/${resources.CONFIRMATION}/${paths.DONE}`,
        };
    }

    private signAuthToken(res: Response, userId: HasId["id"]) {
        const { accessToken } = this.authService.signToken(userId);
        setAuthCookie(res, accessToken, this.jwtExpiresIn);
    }

    @Get("email/resend")
    async resendEmailConfirmation(
        @Query("email") email: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        if (!email) {
            throw new UnprocessableEntityException();
        }

        const emailConfirmation = await this.authService.getEmailConfirmationCodeByEmail(email);

        if (emailConfirmation?.code) {
            try {
                await this.authService.sendConfirmationEmail({
                    code: emailConfirmation.code,
                    email,
                });
            } catch (error) {
                throw new ConfirmationEmailSenderException();
            }
        }

        return res.status(HttpStatus.ACCEPTED).send();
    }
}
