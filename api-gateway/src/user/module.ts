import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { UsersService } from "./service";

@Module({
    imports: [HttpModule],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
