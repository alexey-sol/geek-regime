import { type User } from "@/features/users/models/entities";
import { type PagingParams } from "@/shared/types";

export type GetAllUsersArg = {
    paging: PagingParams;
};

export type GetUserBySlugArg = User["slug"];
