import { type HasId } from "@eggziom/geek-regime-js-utils";

import { type UpdateUserRequest } from "../../models/dtos";

import { type User } from "@/features/users/models/entities";
import { type HasSearchPagingQueryParams } from "@/shared/types";

export type GetAllUsersArg = HasSearchPagingQueryParams;

export type GetUserBySlugArg = User["slug"];

export type UpdateUserByIdArg = HasId & UpdateUserRequest;

export type UploadUserPictureArg = HasId & {
    formData: FormData;
};
