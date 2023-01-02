import { Response } from "express";
import { Catch, HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";

const DEFAULT_ERROR_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;

// Rethrows errors that we get from services.
@Catch(AxiosError)
export class ApiExceptionFilter implements ExceptionFilter {
    catch(exception: AxiosError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response<unknown>>();

        const status = exception.response?.status ?? DEFAULT_ERROR_STATUS;
        const data = exception.response?.data;
        response.status(status).json(data);
    }
}
