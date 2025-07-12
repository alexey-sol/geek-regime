import { HttpException, HttpStatus } from "@nestjs/common";

import { type ApiError } from "@/shared/model/dto";

export class ConfirmationEmailSenderException extends HttpException {
    static data: Pick<ApiError, "details"> = {
        details: [{
            code: "INTEGRATION_ERROR",
            field: "email",
        }],
    };

    constructor() {
        super(ConfirmationEmailSenderException.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
