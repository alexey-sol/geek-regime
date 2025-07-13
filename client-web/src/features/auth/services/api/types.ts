import { type HasDisableFailureNotificationOnStatus } from "@/shared/types";
import { type UserResponse } from "@/features/users/models/dtos";

export type GetProfileArg = Partial<HasDisableFailureNotificationOnStatus>;

type AuthConfirmation = "email";

export type AuthResponse = {
    confirmation?: AuthConfirmation;
    profile?: UserResponse;
};
