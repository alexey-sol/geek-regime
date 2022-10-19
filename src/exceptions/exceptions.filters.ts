import { Request, Response } from "express";
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";
import { ApiExceptionBody } from "@/exceptions/exceptions.types";

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response<ApiExceptionBody>>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status)
            .json({
                status,
                path: request.url,
                message: exception.message,
                timestamp: new Date().toISOString(),
            });
    }
}
