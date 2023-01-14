import { Request, Response } from "express";
import { Catch, HttpException, HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";

import { ProcessConfigService } from "@/config/service";
import { getResource } from "@/shared/utils/url";

import type { ApiExceptionData } from "./types";

const DEFAULT_ERROR_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;

// Rethrows errors that we get from services.
@Catch(AxiosError)
export class ApiExceptionFilter implements ExceptionFilter {
    catch(exception: AxiosError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response<ApiExceptionData | unknown>>();

        const status = exception.response?.status ?? DEFAULT_ERROR_STATUS;
        const data = exception.response?.data;
        response.status(status).json(data);
    }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly processConfigService: ProcessConfigService) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response<ApiExceptionData>>();

        const { isProduction } = this.processConfigService;
        const status = exception.getStatus();
        const trace = exception.stack ?? null;

        response.status(status).json({
            details: [],
            message: exception.message,
            path: request.path,
            resource: getResource(request.path),
            status,
            timestamp: new Date().toISOString(),
            trace: (isProduction) ? null : trace,
        });
    }
}
