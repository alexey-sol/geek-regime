import { type User } from "@/features/users/models/entities";
import { type ApiError } from "@/shared/models/dtos";
import { type UsePageResult } from "@/shared/utils/hooks/use-page";
import { type GetAllPostsByAuthorArg } from "@/features/posts/services/posts-api/types";
import { type UsePostsPageResult } from "@/features/posts/utils/hooks/types";

export type ActiveUserLoading = "get";

export type ActiveUserErrors = Partial<Record<"get", ApiError>>;

export type UseActiveUserResult = {
    errors: ActiveUserErrors;
    loading?: ActiveUserLoading;
    user?: User;
};

export type UsePostsByAuthorArg = Pick<UsePageResult, "setTotalElements"> & {
    arg?: GetAllPostsByAuthorArg;
};

export type UsePostsByAuthorResult = Pick<UsePostsPageResult, "isPending" | "posts">;
