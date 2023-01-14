import { HttpStatus } from "@nestjs/common";

export type ApiExceptionData = {
    details: Record<string, string>[];
    message: string;
    path: string;
    resource: string | null;
    status: HttpStatus;
    timestamp: string;
    trace: string | null;
};
