import { type User } from "@/features/users/models/entities";
import { type ApiError } from "@/shared/models/dtos";

export type ActiveUserPending = "get";

export type ActiveUserErrors = Partial<Record<"get", ApiError>>;

export type UseActiveUserResult = {
    errors: ActiveUserErrors;
    pending?: ActiveUserPending;
    user?: User;
};
