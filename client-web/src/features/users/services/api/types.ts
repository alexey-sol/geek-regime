import { type User } from "@/features/users/models/entities";
import { type QueryParams } from "@/shared/types";

export type GetAllUsersArg = {
    params: QueryParams;
};

export type GetUserBySlugArg = User["slug"];
