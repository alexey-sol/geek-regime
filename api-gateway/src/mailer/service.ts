import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { catchError, firstValueFrom, map } from "rxjs";
import { resources } from "@eggziom/geek-regime-js-utils";

import { type AppConfig } from "@/config/type";
import { DEFAULT_API_VERSION } from "@/app/const";
import { type ResponseDataGetter } from "@/shared/type/api";
import { type SendEmailRequest } from "@/mailer/model/dto";
import { type ConfirmEmailRequest } from "@/user/model/dto";

const API_VERSION = `v${DEFAULT_API_VERSION}`;

@Injectable()
export class MailerService {
    private readonly logger = new Logger(MailerService.name);
    private readonly mailerCf: AppConfig["mailer"];

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService<AppConfig, true>,
    ) {
        this.mailerCf = this.configService.get("mailer", { infer: true });
    }

    async sendConfirmationEmail({ code, email }: Required<ConfirmEmailRequest>): Promise<void> {
        const appName = this.configService.get("process.appName", { infer: true });
        const baseUrl = this.configService.get("apiGateway").baseUrlExternal;

        const callbackUrl = `${baseUrl}`
            + `/api/${API_VERSION}/${resources.CONFIRMATION}/email/redirect`
            + `?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`;

        const request: SendEmailRequest = {
            from_email: this.mailerCf.senderEmail,
            from_name: appName,
            to: email,
            subject: `Подвердите email на ${appName}`,
            html: `<p><a href="${callbackUrl}">Нажмите здесь</a>, чтобы подтвердить свой email.</p>`,
        };

        this.logger.log("SendEmailRequest", request);

        const result = await firstValueFrom(
            this.httpService
                .post(this.mailerCf.endpoint, request, {
                    headers: this.getMailerHeaders(),
                })
                .pipe(this.getData<unknown>())
                .pipe(catchError((error) => {
                    this.logger.error(error);
                    throw error;
                })),
        );

        this.logger.log("Mailer response", result);
    }

    private getMailerHeaders = () => ({
        Authorization: `Bearer ${this.mailerCf.apiKey}`,
    });

    private getData: ResponseDataGetter = () => map((res) => res.data);
}
