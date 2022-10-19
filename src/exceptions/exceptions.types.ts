import { HttpStatus } from "@nestjs/common";

export type ApiExceptionBody = {
    message: string;
    path: string;
    status: HttpStatus;
    timestamp: string;
}
