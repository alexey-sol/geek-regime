import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { MailerService } from "./service";

@Module({
    imports: [HttpModule],
    providers: [MailerService],
    exports: [MailerService],
})
export class MailerModule {}
