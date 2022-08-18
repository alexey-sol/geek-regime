import * as common from "@nestjs/common";
import { ApiResource } from "@/shared/types/api";
import { HttpStatus } from "@nestjs/common";
import { formatErrorName, getMessage } from "@/exceptions/exceptions.utils";

export class ResourceNotFoundException extends common.NotFoundException {
    constructor(
        path?: string,
        resourceName?: string,
        resource: ApiResource = "RESOURCE",
    ) {
        super({
            error: formatErrorName(common.NotFoundException.name),
            message: getMessage(resource, "NOT_FOUND", ["name", resourceName]),
            path,
            status: HttpStatus.NOT_FOUND,
            timestamp: new Date(),
        });
    }
}

export class ResourceForbiddenException extends common.ForbiddenException {
    constructor(
        path?: string,
        resourceName?: string,
        resource: ApiResource = "RESOURCE",
    ) {
        super({
            error: formatErrorName(common.ForbiddenException.name),
            message: getMessage(resource, "FORBIDDEN"),
            path,
            status: HttpStatus.FORBIDDEN,
            timestamp: new Date(),
        });
    }
}
