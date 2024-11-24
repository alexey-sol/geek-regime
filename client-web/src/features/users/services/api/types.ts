import { type User } from "@/features/users/models/entities";
import { type HasSearchPagingQueryParams } from "@/shared/types";

export type GetAllUsersArg = HasSearchPagingQueryParams;

export type GetUserBySlugArg = User["slug"];
