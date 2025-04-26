import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type User } from "@/features/users/models/entities";
import { type HasSearchPagingQueryParams } from "@/shared/types";

import { type UpdateUserRequest } from "../../models/dtos";

export type GetAllUsersArg = HasSearchPagingQueryParams;

export type GetUserBySlugArg = User["slug"];

export type UpdateUserByIdArg = HasId & UpdateUserRequest;

export type UploadUserPictureArg = HasId & {
    formData: FormData;
};
