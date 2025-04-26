import { type User } from "@/features/users/models/entities";
import { type ApiError } from "@/shared/models/dtos";

export type ActiveUserLoading = "get";

export type ActiveUserErrors = Partial<Record<"get", ApiError>>;

export type UseActiveUserResult = {
    errors: ActiveUserErrors;
    loading?: ActiveUserLoading;
    user?: User;
};
