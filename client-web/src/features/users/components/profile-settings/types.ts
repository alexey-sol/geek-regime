import { type UpdateUserRequest } from "@/features/users/models/dtos";

export type ProfileSettingsValues = Pick<UpdateUserRequest, "details" | "email"> & {
    credentials: Pick<UpdateUserRequest, "newPassword" | "oldPassword"> & {
        confirmPassword?: string;
    };
};
